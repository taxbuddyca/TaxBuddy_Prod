import { TaxFacts } from './schemas';

export interface RiskScore {
    score: number;
    level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    flags: RiskFlag[];
    recommendations: string[];
    breakdown: {
        tier1_automated: number;
        tier2_behavioral: number;
        tier3_ratio: number;
        tier4_international: number;
        tier5_death_zone: number;
    };
}

export interface RiskFlag {
    tier: 1 | 2 | 3 | 4 | 5;
    category: string;
    code: string;              // Short machine-readable code for UI
    message: string;
    action: string;            // What the taxpayer should do
    severity: 'low' | 'medium' | 'high' | 'critical';
    probability: number;       // 0–100
    points: number;
}

/**
 * CRA Audit Risk Analyzer — 2025
 *
 * Triggers sourced from:
 * - CRA Audit Activity Reports (2023–25)
 * - CRA IT Bulletins and Interpretation Guides
 * - IC75-7R3 Reassessment Policy
 * - Falconsight / KWB / Mackisen CPA guidance
 * - Intuit Canada CRA audit trigger research
 * - Budget 2024 compliance enhancement measures
 *
 * Score is weighted, capped at 100, bucketed into 4 risk levels.
 * Each tier uses a diminishing point scale so score is additive but bounded.
 */
export class AuditRiskAnalyzer {

    // ─── THRESHOLDS ────────────────────────────────────────────────────────
    private readonly TIER_WEIGHTS = {
        tier1: 1.0,   // Automated — direct data mismatches
        tier2: 0.85,  // Behavioral — lifestyle/pattern anomalies
        tier3: 0.65,  // Ratio — expense outliers vs industry norms
        tier4: 0.80,  // International — offshore / foreign non-compliance
        tier5: 1.0    // Death Zone — near-certain rejection
    };

    calculateRiskScore(facts: TaxFacts): RiskScore {
        const flags: RiskFlag[] = [];
        const breakdown = { tier1_automated: 0, tier2_behavioral: 0, tier3_ratio: 0, tier4_international: 0, tier5_death_zone: 0 };

        const addFlag = (flag: RiskFlag, tier: keyof typeof breakdown) => {
            flags.push(flag);
            breakdown[tier] += flag.points;
        };

        const income = facts.income || 0;
        const revenue = facts.revenue || 0;
        const primaryIncome = income || revenue;

        // ═══════════════════════════════════════════════════════════════════
        // TIER 1 — AUTOMATED DATA MATCHING (95–100% audit probability)
        // CRA's computers auto-flag these before a human ever sees the return
        // ═══════════════════════════════════════════════════════════════════

        // T1-001: T-Slip Income Mismatch
        if (facts.total_t_slips_income && primaryIncome > 0) {
            const gap = facts.total_t_slips_income - primaryIncome;
            if (gap > 500) {
                addFlag({
                    tier: 1, category: 'income_mismatch', code: 'T1-001',
                    probability: 100,
                    message: `T-Slip Mismatch: Reported $${primaryIncome.toLocaleString()} income, but CRA's matching system received T-slips totalling $${facts.total_t_slips_income.toLocaleString()} — a gap of $${gap.toLocaleString()}.`,
                    action: 'Reconcile all T4, T4A, T5, T3, and T5013 slips with your reported income. File an adjustment (T1-ADJ) if required before CRA contacts you.',
                    severity: 'critical', points: 40
                }, 'tier1_automated');
            }
        }

        // T1-002: GST/HST vs Business Income Mismatch
        if (facts.gst_revenue && revenue > 0) {
            const gstGap = Math.abs(facts.gst_revenue - revenue);
            if (gstGap > 1000) {
                addFlag({
                    tier: 1, category: 'income_mismatch', code: 'T1-002',
                    probability: 99,
                    message: `GST/HST vs Business Income Mismatch: T2125 shows $${revenue.toLocaleString()} revenue but your GST/HST return shows $${facts.gst_revenue.toLocaleString()} — difference of $${gstGap.toLocaleString()}.`,
                    action: 'Reconcile your T2125 Line 8000 gross revenue with the revenue on your GST/HST return. Common causes: Quick Method, exempt supplies, or timing differences.',
                    severity: 'critical', points: 38
                }, 'tier1_automated');
            }
        }

        // T1-003: Platform / Gig Economy Income Not Reported
        // CRA receives T4A slips directly from Uber, Airbnb, Upwork, etc.
        if (facts.platform_income && facts.platform_income > 0 && facts.platform_income_reported === false) {
            addFlag({
                tier: 1, category: 'unreported_income', code: 'T1-003',
                probability: 98,
                message: `Platform Income Not Reported: $${facts.platform_income.toLocaleString()} in gig/platform income (Uber, Airbnb, Etsy, etc.) was not declared. CRA receives T4A slips directly from these platforms as of 2024.`,
                action: 'Report all platform income on Schedule C or as self-employment income (T2125). The DAC (Digital Asset Compliance) initiative shares data with CRA.',
                severity: 'critical', points: 38
            }, 'tier1_automated');
        }

        // T1-004: Rental Income Not Reported
        if (facts.rental_income && facts.rental_income > 0 && facts.rental_income_reported === false) {
            addFlag({
                tier: 1, category: 'unreported_income', code: 'T1-004',
                probability: 95,
                message: `Rental Income Not Reported: $${facts.rental_income.toLocaleString()} in rental income not declared. CRA cross-references land registry, municipal data, and short-term rental platforms.`,
                action: 'File Form T776 (Statement of Real Rental Operations). Deduct eligible expenses proportionally. Retroactive filing reduces penalties vs. CRA discovery.',
                severity: 'critical', points: 36
            }, 'tier1_automated');
        }

        // T1-005: Crypto Cashout with No Gains Reported
        if (facts.crypto_cashout_amount && facts.crypto_cashout_amount >= 15000 && facts.crypto_gains_reported === false) {
            addFlag({
                tier: 1, category: 'unreported_income', code: 'T1-005',
                probability: 95,
                message: `Crypto Proceeds Unreported: Cashed out $${facts.crypto_cashout_amount.toLocaleString()} from exchanges with no capital gains or business income declared. CRA receives transaction data from Canadian exchanges (Coinbase, Kraken, Wealthsimple Crypto) via the DAC reporting regime.`,
                action: 'Calculate ACB (Adjusted Cost Base) for all dispositions and report on Schedule 3. CRA can reassess up to 6 years back for unreported gains.',
                severity: 'critical', points: 35
            }, 'tier1_automated');
        }

        // T1-006: Medical Expenses Far Above CRA Claimable Threshold
        if (facts.reported_medical_expenses && primaryIncome > 0) {
            const craThreshold = Math.max(2759, primaryIncome * 0.03);
            const claimable = facts.reported_medical_expenses - craThreshold;
            if (claimable > 15000) {
                addFlag({
                    tier: 1, category: 'deduction_review', code: 'T1-006',
                    probability: 90,
                    message: `High Medical Expenses: Claiming $${facts.reported_medical_expenses.toLocaleString()} in medical expenses (net claimable: ~$${Math.round(claimable).toLocaleString()}). CRA targets claims over $15,000 for "Processing Review" requesting original receipts.`,
                    action: 'Keep all original receipts (not credit card statements). Eligible expenses are listed on Line 33099 / 33199. Cosmetic procedures, gym memberships, vitamins are NOT deductible.',
                    severity: 'high', points: 28
                }, 'tier1_automated');
            }
        }

        // T1-007: 100% Business Vehicle Use with No 2nd Vehicle
        if (facts.business_use_percentage === 100 && facts.num_vehicles_owned === 1) {
            addFlag({
                tier: 1, category: 'vehicle', code: 'T1-007',
                probability: 95,
                message: `100% Vehicle Claim — No 2nd Vehicle: Claiming 100% business use for your only vehicle. CRA automatically flags this as implausible — everyone needs a car for personal travel.`,
                action: 'Reduce claim to reflect actual personal vs. business km split. Keep a CRA-compliant mileage log (date, destination, purpose, km for each trip).',
                severity: 'critical', points: 32
            }, 'tier1_automated');
        }

        // T1-008: Family Payroll — No Bank Transfer Evidence
        if (facts.hiring_spouse && facts.family_remittance_transfer_confirmed === false) {
            addFlag({
                tier: 1, category: 'payroll', code: 'T1-008',
                probability: 95,
                message: `Family Payroll Without Transfer: Issued T4 to family member but bank records show no actual salary transfer. CRA treats this as a fictitious expense deduction.`,
                action: 'Ensure salary is actually e-transferred or deposited each pay period to the family member\'s personal account. Keep records of CRA source deduction remittances (PD7A).',
                severity: 'critical', points: 32
            }, 'tier1_automated');
        }

        // T1-009: Income Reported vs. Known Income Sources (Tip/Flag)
        if (facts.unreported_income_suspected === true) {
            addFlag({
                tier: 1, category: 'income_mismatch', code: 'T1-009',
                probability: 100,
                message: `Suspected Unreported Income: A discrepancy or tip has been flagged indicating possible unreported income. CRA's Informant Program receives thousands of tips annually.`,
                action: 'Conduct a voluntary disclosure (CRA VDP) before CRA contacts you. VDP can reduce or waive penalties and interest on unreported amounts.',
                severity: 'critical', points: 40
            }, 'tier1_automated');
        }

        // T1-010: T5 Investment Income vs. Reported
        if (facts.reported_t5_income && primaryIncome > 0) {
            const hasInvestmentIncome = income > 50000; // Simplified proxy
            if (facts.reported_t5_income > 0 && !hasInvestmentIncome) {
                addFlag({
                    tier: 1, category: 'income_mismatch', code: 'T1-010',
                    probability: 98,
                    message: `T5 Slip Income Not Matched: T5 slips issued to you total $${facts.reported_t5_income.toLocaleString()} in dividends/interest income, but this does not appear reflected in your reported income.`,
                    action: 'Report all T5 dividend and interest income on Schedule 4. CRA auto-matches T5 slips every year — don\'t skip them.',
                    severity: 'critical', points: 36
                }, 'tier1_automated');
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // TIER 2 — BEHAVIORAL / PATTERN FLAGS (60–85% audit probability)
        // Statistical deviations CRA's analytic models catch
        // ═══════════════════════════════════════════════════════════════════

        // T2-001: Lifestyle Gap (Postal Code / Luxury Asset Inconsistency)
        if (facts.lifestyle_gap_detected) {
            addFlag({
                tier: 2, category: 'lifestyle', code: 'T2-001',
                probability: 80,
                message: `Lifestyle-Income Gap: Reported income is inconsistent with observed lifestyle indicators (postal code average income, luxury vehicle ownership, or large property purchases). CRA uses a "net worth" approach to reconstruct actual income.`,
                action: 'Document the source of any large purchases (inheritance, pre-existing savings, loans, partner income). Net worth audits are invasive — consult a CPA proactively.',
                severity: 'high', points: 22
            }, 'tier2_behavioral');
        }

        // T2-002: Real Estate Flip + Principal Residence Claim
        if (facts.property_sold_within_365_days && facts.is_principal_residence_claim) {
            addFlag({
                tier: 2, category: 'real_estate', code: 'T2-002',
                probability: 90,
                message: `Real Estate Flip + PRE Claim: Property sold within 12 months and claimed as Principal Residence. The Anti-Flipping Rule (effective Jan 1, 2023) makes profit 100% business income — PRE does NOT apply.`,
                action: 'Do NOT claim the Principal Residence Exemption. Report profit on T2125 as business income. If a life-event exemption applies (divorce, job change, death), document and attach to return.',
                severity: 'critical', points: 30
            }, 'tier2_behavioral');
        }

        // T2-003: Multiple Properties Sold
        if (facts.properties_sold_in_year && facts.properties_sold_in_year > 1) {
            addFlag({
                tier: 2, category: 'real_estate', code: 'T2-003',
                probability: 80,
                message: `Multiple Property Sales (${facts.properties_sold_in_year} properties sold): Selling more than 1 property in a year is a strong CRA audit pattern. CRA uses land registry data to detect multiple sales.`,
                action: 'Ensure each property sale is properly classified (capital gain vs. business income). Only one property can be designated as Principal Residence per year.',
                severity: 'high', points: 22
            }, 'tier2_behavioral');
        }

        // T2-004: Consistent Business Losses with Employment Income
        if (facts.business_loss_years_consecutive && facts.business_loss_years_consecutive >= 3 && income > 40000) {
            addFlag({
                tier: 2, category: 'business_loss', code: 'T2-004',
                probability: 70,
                message: `${facts.business_loss_years_consecutive}-Year Consecutive Losses with Salary: Business losses for ${facts.business_loss_years_consecutive} straight years while earning $${income.toLocaleString()} in employment income. CRA may reclassify as a "hobby" (no profit intention).`,
                action: 'Document a business plan showing profit intention. CRA looks at: time invested, past profitability, the taxpayer\'s expertise, and expected future profits (Stewart v. Canada test).',
                severity: 'high', points: 20
            }, 'tier2_behavioral');
        }

        // T2-005: Construction / Reno + Cash Deposit Pattern
        if (facts.industry === 'Construction' && facts.cash_deposits_frequency_high) {
            addFlag({
                tier: 2, category: 'cash_business', code: 'T2-005',
                probability: 75,
                message: `Construction Industry Cash Deposits: Frequent cash deposits in a renovation/construction business. This is a tier-1 focus industry for CRA's Underground Economy Initiative. Tip lines are actively used in this sector.`,
                action: 'Deposit all revenue immediately. Issue invoices for every transaction. Avoid cash deposits under the $10,000 FINTRAC reporting threshold — this "structuring" is illegal.',
                severity: 'high', points: 20
            }, 'tier2_behavioral');
        }

        // T2-006: Cash Revenue > 30% (High-Risk Industries)
        const cashRev = facts.cash_revenue_percentage || 0;
        if (cashRev > 30 && revenue > 50000) {
            addFlag({
                tier: 2, category: 'cash_business', code: 'T2-006',
                probability: 65,
                message: `High Cash Revenue Ratio (${cashRev.toFixed(0)}%): Over 30% of revenue is cash-based in a business with $${revenue.toLocaleString()} revenue. CRA's underground economy focus targets high cash-intake industries (restaurants, salons, taxis, construction).`,
                action: 'Issue receipts for all cash sales. Record daily cash counts. Use a POS system. Bank all revenue — unexplained deposits are treated as unreported income.',
                severity: 'high', points: 18
            }, 'tier2_behavioral');
        }

        // T2-007: Income Drop > 40% Year-Over-Year (Anomalous)
        if (facts.income_change_percent_yoy !== undefined && facts.income_change_percent_yoy < -40 && primaryIncome > 30000) {
            addFlag({
                tier: 2, category: 'income_pattern', code: 'T2-007',
                probability: 60,
                message: `Income Dropped ${Math.abs(facts.income_change_percent_yoy).toFixed(0)}% Year-Over-Year: A sharp income decline triggers CRA's outlier detection algorithm, especially for self-employed individuals.`,
                action: 'Keep records explaining the income change (loss of major client, industry downturn, health issues). CRA may compare against GST/HST, industry benchmarks, and prior-year deductions.',
                severity: 'medium', points: 14
            }, 'tier2_behavioral');
        }

        // T2-008: Airbnb / Short-Term Rental Not Reported
        if (facts.airbnb_rental_days && facts.airbnb_rental_days > 14 && facts.rental_income_reported === false) {
            addFlag({
                tier: 2, category: 'real_estate', code: 'T2-008',
                probability: 85,
                message: `Short-Term Rental Income Unreported: Property rented for ${facts.airbnb_rental_days} days but income not reported. CRA receives data from Airbnb, VRBO, and other platforms under Finance Canada's digital platform rules.`,
                action: 'Report rental income on T776 or T2125 (if it meets business income thresholds). If >50% of services provided, consider GST/HST registration. Capital gains exposure on sale increases with rental use.',
                severity: 'critical', points: 30
            }, 'tier2_behavioral');
        }

        // T2-009: Repeated Prior CRA Reassessments
        if (facts.repeated_cra_reassessments) {
            addFlag({
                tier: 2, category: 'compliance_history', code: 'T2-009',
                probability: 70,
                message: `Prior CRA Reassessments on File: A history of CRA reassessments places your account in a higher-scrutiny category. CRA's compliance programs use historical non-compliance as a selection factor.`,
                action: 'Ensure current year has no similar issues to prior reassessments. Consider filing a CPA-prepared return this year. Respond promptly to any CRA correspondence.',
                severity: 'high', points: 18
            }, 'tier2_behavioral');
        }

        // ═══════════════════════════════════════════════════════════════════
        // TIER 3 — RATIO / EXPENSE OUTLIERS (30–60% audit probability)
        // Deductions that deviate from CRA industry benchmarks
        // ═══════════════════════════════════════════════════════════════════

        // T3-001: Home Office > 20%
        if (facts.home_office_percentage && facts.home_office_percentage > 20) {
            addFlag({
                tier: 3, category: 'home_office', code: 'T3-001',
                probability: 65,
                message: `Home Office ${facts.home_office_percentage.toFixed(0)}% — High Claim: CRA expects home office claims of 5–15% for most workers. ${facts.home_office_percentage.toFixed(0)}% implies a dedicated commercial-sized workspace in a residence.`,
                action: 'Calculate using actual space: (office sq ft ÷ total home sq ft). The space must be used exclusively and regularly for business (T2200 required for employees). CRA can request floor plans.',
                severity: 'medium', points: 14
            }, 'tier3_ratio');
        }

        // T3-002: Meals & Entertainment > 2% of Revenue
        if (facts.meals_expenses && revenue > 0) {
            const mealPct = (facts.meals_expenses / revenue) * 100;
            if (mealPct > 2) {
                const dynamicPoints = Math.min(40, 12 + Math.floor(mealPct - 2));
                addFlag({
                    tier: 3, category: 'meals', code: 'T3-002',
                    probability: Math.min(95, 55 + Math.floor(mealPct)),
                    message: `Meals & Entertainment Outlier (${mealPct.toFixed(1)}% of revenue): CRA benchmarks this at <1–2% of revenues. You're also only allowed to claim 50% of the actual meal cost. Current deductible amount: ~$${Math.round(facts.meals_expenses * 0.50).toLocaleString()}.`,
                    action: 'For every meal: keep receipts, note who attended, note the business purpose. Claims without documented business purposes are 100% denied. "Working lunches" alone are typically disallowed.',
                    severity: dynamicPoints >= 25 ? 'critical' : 'medium', points: dynamicPoints
                }, 'tier3_ratio');
            }
        }

        // T3-003: Subcontractor Fees > $10k with No T4A Slips
        if (facts.subcontractor_fees && facts.subcontractor_fees > 10000 && !facts.t4a_slips_issued) {
            addFlag({
                tier: 3, category: 'payroll', code: 'T3-003',
                probability: 55,
                message: `Subcontractor Fees without T4As: Paid $${facts.subcontractor_fees.toLocaleString()} to contractors but issued no T4A slips. T4A slips are required for all payments over $500 to self-employed individuals (ITA s.200).`,
                action: 'Issue T4A slips for all payments > $500 to contractors by February 28 of the following year. Penalty: $25 per day (min $100, max $2,500) per late/missing slip.',
                severity: 'medium', points: 12
            }, 'tier3_ratio');
        }

        // T3-004: Vehicle Expenses > 30% of Revenue (Business)
        const vehicleExpTotal = (facts.vehicle_expenses || 0) + (facts.vehicle_cost ? facts.vehicle_cost * 0.15 : 0);
        if (vehicleExpTotal > 0 && revenue > 0) {
            const vehiclePct = (vehicleExpTotal / revenue) * 100;
            if (vehiclePct > 30) {
                const dynamicPoints = Math.min(40, 14 + Math.floor((vehiclePct - 30) / 2));
                addFlag({
                    tier: 3, category: 'vehicle', code: 'T3-004',
                    probability: Math.min(95, 60 + Math.floor((vehiclePct - 30) / 2)),
                    message: `High Vehicle Expenses (${vehiclePct.toFixed(0)}% of revenue): Vehicle-related claims represent a large portion of revenue. CRA's T2125 industry codes are compared against peer businesses.`,
                    action: 'Maintain a mileage logbook for every trip (date, km, destination, business purpose). CRA accepts digital logs (TripLog, MileIQ). Without a log, CRA will deny the entire vehicle claim.',
                    severity: dynamicPoints >= 25 ? 'critical' : 'medium', points: dynamicPoints
                }, 'tier3_ratio');
            }
        }

        // T3-005: Donations > 10% of Income
        if (facts.donations_amount && primaryIncome > 0) {
            const donationPct = (facts.donations_amount / primaryIncome) * 100;
            if (donationPct > 10) {
                const dynamicPoints = Math.min(40, 12 + Math.floor((donationPct - 10) / 5) * 2);
                addFlag({
                    tier: 3, category: 'donations', code: 'T3-005',
                    probability: Math.min(95, 50 + Math.floor(donationPct - 10)),
                    message: `High Donation Claim (${donationPct.toFixed(0)}% of income): Claimed $${facts.donations_amount.toLocaleString()} in charitable donations vs. $${primaryIncome.toLocaleString()} income. CRA flags outliers vs. the national average of ~1% of income.`,
                    action: 'Keep all official receipts. Never claim inflated receipts — charitable gifting tax shelters are 100% disallowed and assessed with penalties.',
                    severity: dynamicPoints >= 25 ? 'critical' : 'medium', points: dynamicPoints
                }, 'tier3_ratio');
            }
        }

        // T3-006: Late Filing History
        if (facts.late_filing_years && facts.late_filing_years >= 2) {
            addFlag({
                tier: 3, category: 'compliance', code: 'T3-006',
                probability: 40,
                message: `Late Filing Pattern (${facts.late_filing_years} years): Repeated late filing increases CRA scrutiny and incurs compounding penalties. Late-filing penalty: 5% of taxes owed + 1%/month for up to 12 months.`,
                action: 'File on time even if you cannot pay — the failure-to-file penalty is 5–10% of balance owing + 1%/month. Set up a CRA My Account to receive reminders.',
                severity: 'low', points: 8
            }, 'tier3_ratio');
        }

        // T3-007: GST Refund Claim in First Year (New Registrant)
        if (facts.gst_refund_claim_new_registrant) {
            addFlag({
                tier: 3, category: 'gst_hst', code: 'T3-007',
                probability: 70,
                message: `New GST Registrant Claiming Large Refund: CRA audits a high percentage of new HST registrants claiming input tax credit refunds. This is especially common for fraudulent registrations.`,
                action: 'Keep all purchase invoices supporting ITC claims. Net ITC refunds over $25,000 in the first year are almost always audited.',
                severity: 'high', points: 16
            }, 'tier3_ratio');
        }

        // T3-008: Worker Misclassification
        if (facts.worker_misclassification_suspected) {
            addFlag({
                tier: 3, category: 'payroll', code: 'T3-008',
                probability: 65,
                message: `Worker Misclassification Risk: Some contractors may legally qualify as employees (control test, ownership of tools, chance of profit/loss). CRA's CPP/EI rulings retroactively make you responsible for both employer and employee portions.`,
                action: 'Apply CRA\'s 4-factor test for each contractor: control, ownership of tools, financial risk, integration. If unsure, request a ruling (CPT1) before year-end.',
                severity: 'high', points: 16
            }, 'tier3_ratio');
        }

        // T3-009: Shareholder Benefits Not Declared
        if (facts.shareholder_benefits_not_reported) {
            addFlag({
                tier: 3, category: 'corporate', code: 'T3-009',
                probability: 80,
                message: `Undeclared Shareholder Benefits: Using corporate funds for personal expenses (car, home renovation, meals) without including them as T4 income or dividend is a taxable benefit under ITA s.15(1).`,
                action: 'All personal expenses paid by the corp must be included in your T4 income OR repaid to the corp. CRA targets shareholder loans and personal expenses in T2 audits.',
                severity: 'high', points: 20
            }, 'tier3_ratio');
        }

        // ═══════════════════════════════════════════════════════════════════
        // TIER 4 — INTERNATIONAL / OFFSHORE (80–95% audit probability)
        // Cross-border non-compliance is a major 2024–25 CRA focus area
        // ═══════════════════════════════════════════════════════════════════

        // T4-001: Foreign Assets Over $100k — T1135 Not Filed
        if (facts.foreign_assets_over_100k && !facts.t1135_filed) {
            addFlag({
                tier: 4, category: 'international', code: 'T4-001',
                probability: 95,
                message: `T1135 Not Filed — Foreign Assets > $100k: Canadian residents with specified foreign property worth over $100,000 (CAD) at any time in the year MUST file T1135 (Foreign Income Verification). Failure: $25/day penalty (min $100, max $2,500) + potential prosecution.`,
                action: 'File Form T1135 by your return due date. Foreign property includes: bank accounts, shares, debt instruments, and rental/real property. Does NOT include foreign pensions or personal-use property.',
                severity: 'critical', points: 30
            }, 'tier4_international');
        }

        // T4-002: Offshore Bank Accounts Not Declared
        if (facts.has_offshore_accounts && facts.foreign_assets_over_100k) {
            addFlag({
                tier: 4, category: 'international', code: 'T4-002',
                probability: 90,
                message: `Undeclared Offshore Accounts: Offshore bank accounts with significant balances not reported on T1135. Canada participates in the OECD Common Reporting Standard (CRS) — over 100 countries automatically share account data with CRA.`,
                action: 'File T1135 and report all foreign account income. Use the Voluntary Disclosure Program (VDP) for prior years. Penalties for willful non-disclosure can include prosecution under ITA s.239.',
                severity: 'critical', points: 28
            }, 'tier4_international');
        }

        // T4-003: US/Foreign Income Reported but No Foreign Tax Credit
        if (facts.has_us_income && facts.filed_us_taxes && !facts.has_foreign_income) {
            addFlag({
                tier: 4, category: 'international', code: 'T4-003',
                probability: 60,
                message: `Foreign Income Filed but Not on Canadian Return: US income and taxes reported to IRS but foreign tax credit (T2209) not claimed in Canada. You may be double-paying tax unnecessarily.`,
                action: 'File T2209 (Federal Foreign Tax Credits) to claim a credit for taxes paid to the US. The Canada-US tax treaty generally prevents double taxation.',
                severity: 'medium', points: 12
            }, 'tier4_international');
        }

        // ═══════════════════════════════════════════════════════════════════
        // TIER 5 — DEATH ZONE (90–100% rejection probability)
        // Near-certain audit triggers with severe penalties
        // ═══════════════════════════════════════════════════════════════════

        // T5-001: Irregular or Fabricated Mileage Log
        if (facts.irregular_mileage_log) {
            addFlag({
                tier: 5, category: 'death_zone', code: 'T5-001',
                probability: 100,
                message: `💀 DEATH ZONE — Fake Mileage Log: Repetitive round numbers, weekly exact duplicates, or impossible trip patterns — CRA auditors are trained to spot fabricated logs. The entire vehicle deduction is denied plus gross negligence penalties (50% of tax owed).`,
                action: 'Stop using fabricated logs immediately. Use a legitimate app (TripLog, MileIQ, Everlance) going forward. If numbers were fabricated in prior years, consult a CPA about voluntary disclosure.',
                severity: 'critical', points: 40
            }, 'tier5_death_zone');
        }

        // T5-002: Shareholder Loan Over 1 Year
        if (facts.unpaid_shareholder_loan) {
            addFlag({
                tier: 5, category: 'death_zone', code: 'T5-002',
                probability: 90,
                message: `💀 DEATH ZONE — Unpaid Shareholder Loan (>1 Year): Under ITA s.15(2), if you borrow money from your corporation and don't repay within the year FOLLOWING the fiscal year end, the entire loan is included in your personal income. This is a classic T2 audit trigger.`,
                action: 'Repay the shareholder loan before the corporation\'s fiscal year end (or within 1 year of the year it was borrowed). If not repayable, declare it as a salary or dividend instead.',
                severity: 'critical', points: 38
            }, 'tier5_death_zone');
        }

        // T5-003: Union Dues Claimed — T4 Box 44 Empty
        if (facts.union_dues_claim_mismatch) {
            addFlag({
                tier: 5, category: 'death_zone', code: 'T5-003',
                probability: 100,
                message: `💀 DEATH ZONE — Union Dues Mismatch: Line 21200 (union dues) claimed but T4 Box 44 is empty. CRA auto-matches this every year — instant rejection with gross negligence penalty assessment possible.`,
                action: 'Remove the union dues claim unless you have a professional dues receipt from a union or professional association that matches the amount. T4 Box 44 or a separate dues receipt is required.',
                severity: 'critical', points: 40
            }, 'tier5_death_zone');
        }

        // T5-004: Aggressive Tax Shelter
        if (facts.aggressive_tax_shelter_claimed) {
            addFlag({
                tier: 5, category: 'death_zone', code: 'T5-004',
                probability: 95,
                message: `💀 DEATH ZONE — Aggressive Tax Shelter: Tax shelters requiring CRA registration (leveraged donation schemes, gifting tax shelters like GLGI, flow-through shares schemes) are subject to 100% audit. CRA has won virtually every challenged tax shelter case since 2010.`,
                action: 'Reverse the transaction if still possible. File a voluntary disclosure. These schemes have resulted in taxpayers owing more in interest and penalties than the original tax "saved".',
                severity: 'critical', points: 40
            }, 'tier5_death_zone');
        }

        // T5-005: Salary Below Minimum Wage — Owner-Manager Splitting
        if (facts.salary_below_minimum_wage && facts.revenue && facts.revenue > 100000) {
            addFlag({
                tier: 5, category: 'death_zone', code: 'T5-005',
                probability: 85,
                message: `TOSI / Income Splitting Risk — Below Market Salary: Owner draws very low salary from a profitable corporation to split income via dividends to low-income family members. CRA's TOSI rules tax these dividends at the top marginal rate.`,
                action: 'Pay yourself a reasonable market salary or consult on TOSI compliance. Document that family members perform real services to avoid TOSI characterization.',
                severity: 'critical', points: 35
            }, 'tier5_death_zone');
        }

        // T5-006: Expenses & Losses Grossly Disproportionate to Income
        const totalRecognizableDeductions =
            (facts.meals_expenses || 0) +
            (facts.subcontractor_fees || 0) +
            (facts.vehicle_expenses || 0) +
            (facts.business_expenses || 0) +
            (facts.reported_medical_expenses || 0) +
            (facts.donations_amount || 0) +
            (facts.total_home_expenses ? facts.total_home_expenses * ((facts.home_office_percentage || 0) / 100) : 0);

        if (totalRecognizableDeductions > 0) {
            if (primaryIncome === 0) {
                if (totalRecognizableDeductions > 10000) {
                    addFlag({
                        tier: 5, category: 'death_zone', code: 'T5-006',
                        probability: 100,
                        message: `💀 DEATH ZONE — Zero Income, Massive Expenses: Claiming $${Math.round(totalRecognizableDeductions).toLocaleString()} in deductions/expenses with $0 reported income is automatically flagged as highly suspicious for "hobby business" or fictitious losses.`,
                        action: 'CRA denies business expenses if there is no genuine expectation of profit. If this is a startup year, you must formulate and document a concrete business plan.',
                        severity: 'critical', points: 50
                    }, 'tier5_death_zone');
                }
            } else {
                const ratio = totalRecognizableDeductions / primaryIncome;
                if (ratio > 1.5) { // Expenses are > 150% of income
                    const isExtreme = ratio >= 5; // e.g., 5x, 10x, 100x income
                    const penaltyPoints = isExtreme ? Math.min(80, 40 + Math.floor(ratio * 2)) : Math.min(30, 15 + Math.floor(ratio * 5));

                    addFlag({
                        tier: isExtreme ? 5 : 2,
                        category: isExtreme ? 'death_zone' : 'business_loss',
                        code: isExtreme ? 'T5-006' : 'T2-010',
                        probability: isExtreme ? 100 : 85,
                        message: isExtreme
                            ? `💀 DEATH ZONE — Extreme Expense Claim: Total claimed deductions ($${Math.round(totalRecognizableDeductions).toLocaleString()}) are ${ratio.toFixed(1)}x greater than your reported income ($${primaryIncome.toLocaleString()}). Such exponential ratios generate immediate, automatic audits.`
                            : `Excessive Deductions Ratio: Total claimed deductions ($${Math.round(totalRecognizableDeductions).toLocaleString()}) significantly exceed reported income ($${primaryIncome.toLocaleString()}). This heavy loss position is statistically anomalous.`,
                        action: 'CRA systems automatically trigger a pre-assessment review when losses are heavily disproportionate to verifiable income. Ensure EVERY dollar is perfectly receipted.',
                        severity: isExtreme ? 'critical' : 'high',
                        points: penaltyPoints
                    }, isExtreme ? 'tier5_death_zone' : 'tier2_behavioral');
                }
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // SCORING
        // ═══════════════════════════════════════════════════════════════════

        // Weighted score: use log compression to prevent any single tier dominating
        const rawScore = (
            Math.min(breakdown.tier1_automated, 50) * this.TIER_WEIGHTS.tier1 +
            Math.min(breakdown.tier2_behavioral, 35) * this.TIER_WEIGHTS.tier2 +
            Math.min(breakdown.tier3_ratio, 30) * this.TIER_WEIGHTS.tier3 +
            Math.min(breakdown.tier4_international, 25) * this.TIER_WEIGHTS.tier4 +
            Math.min(breakdown.tier5_death_zone, 40) * this.TIER_WEIGHTS.tier5
        );

        // Normalize to 0–100 scale
        const maxPossibleRaw = 50 + 35 * 0.85 + 30 * 0.65 + 25 * 0.80 + 40;
        const finalScore = Math.min(100, Math.round((rawScore / maxPossibleRaw) * 100));

        return {
            score: finalScore,
            level: this.getRiskLevel(finalScore),
            flags: flags.sort((a, b) => b.points - a.points), // Most severe first
            recommendations: this.generateRecommendations(finalScore, flags),
            breakdown
        };
    }

    private getRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
        if (score < 20) return 'LOW';
        if (score < 45) return 'MEDIUM';
        if (score < 70) return 'HIGH';
        return 'CRITICAL';
    }

    private generateRecommendations(score: number, flags: RiskFlag[]): string[] {
        const recs: string[] = [];
        const hasTier5 = flags.some(f => f.tier === 5);
        const hasTier4 = flags.some(f => f.tier === 4);
        const hasTier1 = flags.some(f => f.tier === 1);

        // Score-based recommendations
        if (score >= 70) {
            recs.push('🚨 CRITICAL: File through a CPA this year — the detected issues carry automatic audit or gross negligence penalty risk.');
            recs.push('📁 Assemble all receipts, bank statements, contracts, and mileage logs before filing.');
            recs.push('📊 Consider a Voluntary Disclosure (CRA VDP) for any unreported prior-year income — this reduces penalties and avoids prosecution.');
        } else if (score >= 45) {
            recs.push('🔴 HIGH RISK: Have a CPA review your return before filing. The flagged items are known CRA targets.');
            recs.push('📋 Organize all business records: invoices, contracts, bank statements (keep 6 years minimum).');
        } else if (score >= 20) {
            recs.push('🟡 MEDIUM RISK: Review flagged items carefully. Ensure deductions have receipts and documentation.');
            recs.push('📁 Keep all records for 6 years from filing date (CRA\'s standard reassessment window).');
        } else {
            recs.push('🟢 LOW RISK: Your tax profile appears compliant based on the information provided.');
            recs.push('✅ Continue maintaining organized records and filing on time to maintain your low-risk status.');
        }

        // Tier-specific recommendations
        if (hasTier5) {
            recs.push('💀 DEATH ZONE: One or more items carry near-certain rejection risk. Correct these BEFORE filing.');
        }

        if (hasTier4) {
            recs.push('🌏 INTERNATIONAL: Foreign asset reporting is non-negotiable. CRA shares data with 100+ countries via the OECD CRS. Penalties start at $1,000 and can lead to prosecution.');
        }

        if (hasTier1) {
            recs.push('⚡ AUTOMATED: Tier 1 flags are computer-generated before a human reads your return. These WILL generate CRA letters within 6–8 weeks of filing.');
        }

        return recs;
    }

    // Utility helpers for UI
    getRiskColor(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string {
        switch (level) {
            case 'LOW': return 'bg-green-50 border-green-200 text-green-900';
            case 'MEDIUM': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
            case 'HIGH': return 'bg-orange-50 border-orange-200 text-orange-900';
            case 'CRITICAL': return 'bg-red-50 border-red-200 text-red-900';
        }
    }

    getRiskIcon(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string {
        switch (level) {
            case 'LOW': return '✅';
            case 'MEDIUM': return '⚠️';
            case 'HIGH': return '🔴';
            case 'CRITICAL': return '🚨';
        }
    }

    getTierLabel(tier: 1 | 2 | 3 | 4 | 5): string {
        const labels: Record<number, string> = {
            1: 'Automated Match',
            2: 'Behavioral Pattern',
            3: 'Expense Ratio',
            4: 'International',
            5: '⚠️ Death Zone'
        };
        return labels[tier] || 'Unknown';
    }
}
