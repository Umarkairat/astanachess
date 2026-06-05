const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace hardcoded dark breadcrumb backgrounds with light green
    content = content.replace(/background-color:\s*#080809;/g, 'background-color: #F0FDF4;');
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated breadcrumb background in ${file}`);
});
