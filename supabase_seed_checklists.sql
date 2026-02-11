-- Seed Checklist Data
INSERT INTO public.checklists (category, items, order_index)
VALUES (
        'Personal Information',
        ARRAY [
        'Social Insurance Number (SIN)',
        'Date of Birth',
        'Notice of Assessment from last year',
        'Marital Status change details (if changed)',
        'Dependant information (spouse/children)',
        'Direct Deposit information'
    ],
        0
    ),
    (
        'Income Slips',
        ARRAY [
        'T4 (Employment Income)',
        'T4A (Pension, annuity, and other income)',
        'T5 (Investment Income)',
        'T3 (Trust Income - Mutual Funds/ETFs)',
        'T4E (Employment Insurance Benefits)',
        'T5007 (Social Assistance / Workers Comp)',
        'T4RSP (RRSP Income)',
        'T4RIF (RRIF Income)'
    ],
        1
    ),
    (
        'Deductions & Credits',
        ARRAY [
        'RRSP Contribution Receipts',
        'Medical Expenses (Prescriptions, Dental, etc.)',
        'Charitable Donations Receipts',
        'Tuition Slips (T2202)',
        'Student Loan Interest Statement',
        'Child Care Expenses (Receipts required)',
        'Union or Professional Dues',
        'Digital News Subscription Receipts'
    ],
        2
    ),
    (
        'Home, Work & Other',
        ARRAY [
        'T2200 (Declaration of Conditions of Employment)',
        'Home Office Expenses (Rent, Utilities, Internet)',
        'Moving Expenses (if moved 40km+ for work)',
        'Property Tax Bill / Rent Receipts (for provincial credits)',
        'Investment Counsel Fees',
        'Disability Tax Credit Certificate (T2201)'
    ],
        3
    ) ON CONFLICT DO NOTHING;