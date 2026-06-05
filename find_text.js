const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let idx = content.indexOf('Центральный шахматный клуб «ASTANA» — шахматная школа с большой историей');
    if (idx !== -1) {
        console.log(`Found in ${file}`);
        console.log(content.substring(Math.max(0, idx - 150), idx + 150));
    }
});
