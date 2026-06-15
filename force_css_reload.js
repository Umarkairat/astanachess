const fs = require('fs');
const path = require('path');

const baseDir = 'c:/projects/astanachess';
const subDirs = ['', 'kz', 'en'];
const version = Date.now();

subDirs.forEach(sub => {
    const dirPath = path.join(baseDir, sub);
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update CSS cache buster
        content = content.replace(/href="(\.\.\/)?assets\/css\/style\.css(\?v=\d+)?"/g, `href="$1assets/css/style.css?v=${version}"`);
        
        // Update JS cache buster
        content = content.replace(/src="(\.\.\/)?assets\/js\/main\.js(\?v=\d+)?"/g, `src="$1assets/js/main.js?v=${version}"`);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated cache busters in ${path.join(sub, file)}`);
    });
});

console.log(`Successfully updated all HTML files to version query parameter: ?v=${version}`);
