const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the <li> containing the astanaopen.html link from navigation menus
    const updatedContent = content.split('\n').filter(line => !line.includes('<a href="astanaopen.html" data-i18n="nav_astanaopen"') && !line.includes('<a href="astanaopen.html" class="active" data-i18n="nav_astanaopen"')).join('\n');
    
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Removed Astana Open tab from ${file}`);
    }
});
