const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'app');

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replacements
            // 1. Narrow containers
            content = content.replace(/container mx-auto px-6 text-center max-w-4xl/g, 'page-container-narrow text-center');
            content = content.replace(/container mx-auto px-6 relative z-10 text-center max-w-4xl/g, 'page-container-narrow relative z-10 text-center');
            content = content.replace(/container mx-auto px-6 max-w-4xl/g, 'page-container-narrow');
            content = content.replace(/container mx-auto px-6 relative z-10 max-w-4xl/g, 'page-container-narrow relative z-10');
            content = content.replace(/container mx-auto px-6 max-w-5xl/g, 'page-container-narrow'); // Map 5xl to narrow for now or leave if specific

            // 2. Default containers
            content = content.replace(/container mx-auto px-6 relative z-10/g, 'page-container relative z-10');
            content = content.replace(/container mx-auto px-6/g, 'page-container');
            content = content.replace(/container mx-auto px-4 md:px-6/g, 'page-container');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated layout in: ${fullPath}`);
            }
        }
    }
}

walkDir(targetDir);
console.log('Layout refactoring complete!');
