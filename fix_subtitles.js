const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let original = content;

    // Replace the specific text-main pattern in all intro subtitles
    content = content.replace(/<p style="font-size: 1\.1rem; margin-bottom: 1\.5rem; color: var\(--text-main\); font-weight: 500;">/g, 
        '<p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: var(--text-dark); opacity: 0.9; font-weight: 500;">');

    // Just to be sure, if any other subtitle has exactly color: var(--text-main);
    // Let's do a more generic replacement for any <p> that has color: var(--text-main) but is NOT in a card
    // Since doing that via regex is hard, the above replace should catch the intros.

    if (content !== original) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
