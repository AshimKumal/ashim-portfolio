const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const errors = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    // Find all href and src
    const linkRegex = /(?:href|src)=["']([^"']+)["']/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        let link = match[1];
        
        // Ignore external links, mailto, tel, anchors
        if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('#')) {
            continue;
        }
        
        // Remove query params and hashes for local files
        link = link.split('?')[0].split('#')[0];
        
        if (!link) continue;
        
        const targetPath = path.join(dir, link);
        if (!fs.existsSync(targetPath)) {
            errors.push(`File: ${file} -> Broken link: ${link}`);
        }
    }
});

if (errors.length > 0) {
    console.log("Found the following broken links/missing assets:");
    errors.forEach(e => console.log(e));
} else {
    console.log("No broken links found!");
}
