// Diagnostic: finding Ontario $150 difference
// Our app: $5,086, Intuit: $4,936, Diff: $150

// Test multiple incomes to find which one gives $5,086
const F = { brackets: [57375, 114750, 177882, 253414], rates: [0.145, 0.205, 0.26, 0.29, 0.33], bpaMax: 16129, bpaMin: 14538, ceaMax: 1471 };
const CPP = { ympe: 71300, yampe: 81200, exemption: 3500, baseRate: 0.0495, enhancedRate: 0.01, rate2: 0.04 };
const EI = { mie: 65700, rate: 0.0164, max: 1077.48 };
const ON = { brackets: [52886, 105775, 150000, 220000], rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316], bpa: 12747, st1: 5710, st2: 7307 };

function calcTax(inc, b, r) { let t = 0, p = 0; for (let i = 0; i < b.length; i++) { if (inc > b[i]) { t += (b[i] - p) * r[i]; p = b[i]; } else { t += (inc - p) * r[i]; return t; } } t += (inc - p) * r[r.length - 1]; return t; }

function ohp(ti) {
    if (ti <= 20000) return 0;
    if (ti <= 36000) return Math.min(300, (ti - 20000) * 0.06);
    if (ti <= 48000) return Math.min(600, 450 + (ti - 36000) * 0.06);
    if (ti <= 72000) return Math.min(750, 600 + (ti - 48000) * 0.25);
    if (ti <= 200000) return Math.min(900, 750 + (ti - 72000) * 0.25);
    return 900;
}

// Find which income gives prov=$5,086
for (let inc = 60000; inc <= 120000; inc += 1000) {
    const cpp1 = Math.max(0, Math.min(inc, CPP.ympe) - CPP.exemption);
    const baseCPP = cpp1 * CPP.baseRate;
    const enhCPP = cpp1 * CPP.enhancedRate;
    const cpp2 = Math.min(Math.max(0, Math.min(inc, CPP.yampe) - CPP.ympe) * CPP.rate2, 396);
    const totalEI = Math.min(inc * EI.rate, EI.max);

    const deductCPP = enhCPP + cpp2;
    const taxInc = Math.max(0, inc - deductCPP);

    let prov = calcTax(taxInc, ON.brackets, ON.rates);
    prov -= ON.bpa * ON.rates[0];
    prov -= (baseCPP + totalEI) * ON.rates[0];
    prov = Math.max(0, prov);

    let surtax = 0;
    if (prov > ON.st1) surtax += (prov - ON.st1) * 0.20;
    if (prov > ON.st2) surtax += (prov - ON.st2) * 0.36;
    prov += surtax;

    const ohpAmt = ohp(taxInc);
    const total = prov + ohpAmt;

    if (Math.abs(total - 5086) < 10) {
        console.log("Match: income=" + inc + " taxableInc=" + taxInc);
        console.log("  Prov bracket tax=" + calcTax(taxInc, ON.brackets, ON.rates).toFixed(2));
        console.log("  Credits=" + (ON.bpa * ON.rates[0] + (baseCPP + totalEI) * ON.rates[0]).toFixed(2));
        console.log("  Prov after credits=" + (prov - surtax).toFixed(2));
        console.log("  Surtax=" + surtax.toFixed(2));
        console.log("  OHP=" + ohpAmt.toFixed(2));
        console.log("  Total prov=" + total.toFixed(2));
        console.log("  Without OHP=" + prov.toFixed(2));
        console.log("  If OHP=$750 total=" + (prov + 750).toFixed(2));
    }
}
