const fs = require('fs');
const path = require('path');

const directoriesToScan = ['d:/Taxbuddycanada/app', 'd:/Taxbuddycanada/components'];

function getAllTsxFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllTsxFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

let modifiedFilesCount = 0;

function addFocusToClassString(classString) {
    if (
        (classString.includes('hover:') || classString.includes('bg-') || classString.includes('px-')) &&
        !classString.includes('focus:outline-none') &&
        !classString.includes('focus:ring')
    ) {
        return classString + ' focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2';
    }
    return classString;
}

directoriesToScan.forEach(dir => {
    if (fs.existsSync(dir)) {
        const tsxFiles = getAllTsxFiles(dir);

        tsxFiles.forEach(filePath => {
            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;

            // 1. Match className="something"
            content = content.replace(/(<(?:button|Link|a)\b[^>]*?className=)(['"])([\s\S]*?)\2/g, (match, prefix, quote, classNames) => {
                return prefix + quote + addFocusToClassString(classNames) + quote;
            });

            // 2. Match className={`something`}
            content = content.replace(/(<(?:button|Link|a)\b[^>]*?className=\{)(`)([\s\S]*?)\2(\})/g, (match, prefix, quote, classNames, suffix) => {
                return prefix + quote + addFocusToClassString(classNames) + quote + suffix;
            });

            // 3. Match className={"something"} or {'something'}
            content = content.replace(/(<(?:button|Link|a)\b[^>]*?className=\{)(['"])([\s\S]*?)\2(\})/g, (match, prefix, quote, classNames, suffix) => {
                return prefix + quote + addFocusToClassString(classNames) + quote + suffix;
            });

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated focus states in: ${filePath}`);
                modifiedFilesCount++;
            }
        });
    }
});

console.log(`Total files updated: ${modifiedFilesCount}`);
