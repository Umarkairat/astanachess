const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove translations.js script tag
    const updatedContent = content.split('\n').filter(line => !line.includes('<script src="assets/js/translations.js"></script>')).join('\n');
    
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Removed translations.js script from ${file}`);
    }
});
