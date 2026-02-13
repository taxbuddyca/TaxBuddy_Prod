import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SOURCE_DIR = 'C:/websites/account/accountor.ca/blog';
const BUCKET_NAME = 'blog-images';

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

const STOCK_IMAGES = [
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1573164060897-39031465c411?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000'
];

function getRandomStockImage() {
    return STOCK_IMAGES[Math.floor(Math.random() * STOCK_IMAGES.length)];
}

async function uploadImage(localPath, folder = '') {
    if (!localPath || !fs.existsSync(localPath)) return null;

    // Check if filename contains 'accountor'
    const baseName = path.basename(localPath).toLowerCase();
    if (baseName.includes('accountor')) {
        return getRandomStockImage();
    }

    try {
        const fileBuffer = fs.readFileSync(localPath);
        const ext = path.extname(localPath).toLowerCase().replace('.', '');
        const fileName = `${folder}${path.basename(localPath)}`;
        const contentType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, fileBuffer, {
                contentType,
                upsert: true
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        return publicUrl;
    } catch (err) {
        return null;
    }
}

function cleanText(text) {
    if (!text) return '';
    return text.replace(/Accountor CPA/gi, 'TaxBuddy Canada')
        .replace(/Accountor Inc/gi, 'TaxBuddy Canada')
        .replace(/Accountor\.ca/gi, 'mytaxbuddy4u.ca')
        .replace(/Accountor/gi, 'TaxBuddy')
        .trim();
}

async function migrate() {
    const files = [];

    function walk(dir) {
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith('.html')) {
                const base = file.toLowerCase();
                if (!base.startsWith('index') && !base.includes('google')) {
                    files.push(fullPath);
                }
            }
        });
    }

    walk(SOURCE_DIR);
    console.log(`Found ${files.length} valid blogs.`);

    for (const filePath of files) {
        try {
            const html = fs.readFileSync(filePath, 'utf-8');
            const $ = cheerio.load(html);

            const slug = path.basename(filePath, '.html');
            const category = path.basename(path.dirname(filePath));

            const title = cleanText($('h1').first().text()) || slug;
            const excerpt = cleanText($('meta[name="description"]').attr('content') || '');

            let published_at = new Date().toISOString();
            const dateText = $('p:contains("Updated on")').text();
            if (dateText) {
                const match = dateText.match(/Updated on ([\d\s\w,]+)/);
                if (match) {
                    const parsedDate = new Date(match[1]);
                    if (!isNaN(parsedDate.getTime())) {
                        published_at = parsedDate.toISOString();
                    }
                }
            }

            const author = cleanText($('.post-meta li:contains("Author")').text().replace('Author:', '')) || 'TaxBuddy Team';

            // Find cover image
            let cover_image = null;
            const coverImgSrc = $('.blog-image img').attr('src') || $('.blog-image-text img').attr('src');
            if (coverImgSrc) {
                const absImagePath = path.resolve(path.dirname(filePath), coverImgSrc);
                cover_image = await uploadImage(absImagePath, 'covers/');
            }

            const $contentBody = $('.blog-content').clone();
            $contentBody.find('.media-body, .post-meta, .blog-image-text, script, style, svg').remove();

            let contentHtml = $contentBody.html() || '';
            const $nested = cheerio.load(contentHtml);
            const innerBody = $nested('body').html();
            if (innerBody) contentHtml = innerBody;

            contentHtml = cleanText(contentHtml);
            const $final = cheerio.load(contentHtml);

            const contentImages = $final('img').toArray();
            for (const img of contentImages) {
                const src = $final(img).attr('src');
                if (src && !src.startsWith('http')) {
                    const absPath = path.resolve(path.dirname(filePath), src);
                    const uploadedUrl = await uploadImage(absPath, 'content/');
                    if (uploadedUrl) {
                        $final(img).attr('src', uploadedUrl);
                    }
                } else if (src && src.toLowerCase().includes('accountor')) {
                    $final(img).attr('src', getRandomStockImage());
                }
            }

            const cleanHtml = $final('body').html() || $final.html();
            const markdown = turndownService.turndown(cleanHtml);

            const faq_items = [];
            const faqHeading = $final('h2#faqs, h2:contains("FAQs")');
            if (faqHeading.length) {
                let currentItem = faqHeading.next();
                while (currentItem.length && currentItem.prop('tagName') !== 'H2') {
                    if (currentItem.prop('tagName') === 'H3') {
                        const question = cleanText(currentItem.text().trim());
                        const answer = cleanText(currentItem.next('p').text().trim());
                        if (question && answer) {
                            faq_items.push({ question, answer });
                        }
                    }
                    currentItem = currentItem.next();
                }
            }

            const postData = {
                title,
                slug,
                excerpt,
                content: markdown,
                category,
                published_at,
                author,
                cover_image,
                faq_items: faq_items.length > 0 ? faq_items : null
            };

            const { error } = await supabase
                .from('posts')
                .upsert(postData, { onConflict: 'slug' });

            if (error) {
                console.error(`Error migrating ${slug}:`, error.message);
            } else {
                process.stdout.write('.');
            }
        } catch (err) {
            console.error(`\nFailed to process ${filePath}:`, err.message);
        }
    }
    console.log("\nMigration complete.");
}

migrate();
