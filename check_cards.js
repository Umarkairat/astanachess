const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // We want to find any text-dark that is inside a <div class="card" ...>
    // This is hard with regex, let's just log occurrences of text-dark
    // Actually, I'll just check tournaments, obuchenie, o-shaxmatax manually or wait for the user.
    // I know that the `fix_astanaopen.js` script replaced ANY var(--text-muted) with var(--text-dark).
    // So ANY card that originally had var(--text-muted) is now broken.
    // Did o-shaxmatax have cards?
    // Let's check.
});
