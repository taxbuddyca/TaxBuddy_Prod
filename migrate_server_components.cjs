const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'app');

const clientTriggers = [
    'useState', 'useEffect', 'useRef', 'useContext', 'useRouter',
    'useSearchParams', 'usePathname', 'onClick', 'onChange', 'onSubmit',
    'framer-motion', 'window.', 'document.'
];

function canBeServerComponent(content) {
    for (const trigger of clientTriggers) {
        if (content.includes(trigger)) {
            return false;
        }
    }
    return true;
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Check if it starts with "use client"
            if (content.includes('"use client";') || content.includes("'use client';")) {
                let checkContent = content.replace(/"use client";\r?\n?/g, '').replace(/'use client';\r?\n?/g, '');

                if (canBeServerComponent(checkContent)) {
                    console.log(`Migrating to Server Component: ${fullPath}`);
                    fs.writeFileSync(fullPath, checkContent, 'utf8');
                }
            }
        }
    }
}

processDir(targetDir);
console.log('Server Component Migration Pass 1 Complete!');
