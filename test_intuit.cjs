const data = {
    intuit: {
        total: 23856,
        fed: 9542,
        prov: 8806,
        cpp_ei: 5508
    },
    ours: {
        total: 24569,
        fed: 9871,
        prov: 9161,
        cpp_ei: 5537
    }
};

console.log("Difference Fed: ", data.ours.fed - data.intuit.fed);
console.log("Difference Prov: ", data.ours.prov - data.intuit.prov);
console.log("Difference CPP/EI: ", data.ours.cpp_ei - data.intuit.cpp_ei);

// Try to reverse engineer what 5508 is composed of
// If CPP is 4148.10+312 (4460.10) and EI is 1047.90?
// Max EI 2025: 65,700... but what if the rate is different?
console.log(5508 - 4148.1); // 1359?
// What if CPP is 2025 base + enhanced but no tier 2?
console.log(5508 - 4147.15); // 1360.85
// What if EI is 1077.48?
console.log(5508 - 1077.48); // 4430.52 

// What if Intuit uses 2024 specs?
// $100,000 fed tax 2024
let fed2024 = (55867 * 0.15) + ((100000 - 55867) * 0.205) - (15705 * 0.15) - (1433 * 0.15) - (5104.62 * 0.15);
console.log("2024 Fed:", fed2024); // 14212.7? Wait, Intuit is 9542.
