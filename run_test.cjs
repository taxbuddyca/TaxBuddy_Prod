const { exec } = require('child_process');
const fs = require('fs');

const command = 'npx playwright test --reporter=line';

console.log(`Running: ${command}`);

exec(command, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
    const output = `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`;
    fs.writeFileSync('test_result.log', output);
    if (error) {
        console.error(`exec error: ${error}`);
    }
    console.log('Test finished. Output written to test_result.log');
});
