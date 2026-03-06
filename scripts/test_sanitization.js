function sanitizeName(scenarioName) {
    return (scenarioName || 'Tax_Report')
        .replace(/[/\\?%*:|"<>]/g, '_')
        .trim();
}

const testCases = [
    { input: "Student / New Grad", expected: "Student _ New Grad" },
    { input: "Family: Plan 2025", expected: "Family_ Plan 2025" },
    { input: "Report | Final", expected: "Report _ Final" },
    { input: "Safe Report", expected: "Safe Report" },
    { input: null, expected: "Tax_Report" }
];

testCases.forEach(tc => {
    const result = sanitizeName(tc.input);
    console.log(`Input: "${tc.input}" -> Output: "${result}" - ${result === tc.expected ? 'PASS' : 'FAIL'}`);
});
