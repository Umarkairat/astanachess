const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Add a cache-buster query parameter to force the browser to load the new CSS
    content = content.replace(/href="assets\/css\/style\.css(\?v=\d+)?"/g, 'href="assets/css/style.css?v=' + Date.now() + '"');
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});
