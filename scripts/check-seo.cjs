const fs = require('fs');
const path = require('path');

const appDir = 'd:/Taxbuddycanada/app';

function getAllPages(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllPages(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file === 'page.tsx' || file === 'page.jsx') {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const pages = getAllPages(appDir);
const missingH1 = [];
const missingMeta = [];

pages.forEach(page => {
    const content = fs.readFileSync(page, 'utf8');

    // Check H1
    if (!content.match(/<h1/i) && !content.match(/<Heading[^>]*as="h1"/i)) {
        // Check if it imports a Hero component that might have the H1
        if (!content.match(/Hero\b/i)) {
            missingH1.push(page);
        }
    }

    // Check Meta
    const hasMeta = content.match(/export\s+(const\s+metadata|async\s+function\s+generateMetadata)/i);
    let hasLayoutMeta = false;

    const layoutPath = path.join(path.dirname(page), 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
        const layoutContent = fs.readFileSync(layoutPath, 'utf8');
        if (layoutContent.match(/export\s+(const\s+metadata|async\s+function\s+generateMetadata)/i)) {
            hasLayoutMeta = true;
        }
    }

    if (!hasMeta && !hasLayoutMeta) {
        // Also check root layout since it applies globally, but each route *should* have its own title ideally
        missingMeta.push(page);
    }
});

console.log('--- Missing H1 ---');
console.log(missingH1.join('\n'));
console.log('\n--- Missing Meta ---');
console.log(missingMeta.join('\n'));
