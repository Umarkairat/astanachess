const fs = require('fs');

const cssPath = 'c:/projects/astanachess/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Fix Filter Buttons text on light background
css = css.replace(/\.filter-btn \{\n  background-color: transparent;\n  border: 1px solid var\(--border-color\);\n  color: var\(--text-muted\);/g, `.filter-btn {\n  background-color: transparent;\n  border: 1px solid var(--border-color);\n  color: var(--text-dark);\n  opacity: 0.7;`);

css = css.replace(/\.filter-btn:hover,\n\.filter-btn\.active \{\n  color: var\(--text-dark\);\n  background-color: var\(--primary-gold\);/g, `.filter-btn:hover,\n.filter-btn.active {\n  color: var(--text-dark);\n  opacity: 1;\n  background-color: var(--primary-gold);`);

// Fix Trainer Cards text on dark background
css = css.replace(/\.trainer-name \{\n  font-size: 1\.25rem;/g, `.trainer-name {\n  font-size: 1.25rem;\n  color: var(--text-main);`);

css = css.replace(/\.trainer-desc \{\n  color: var\(--text-muted\);/g, `.trainer-desc {\n  color: rgba(255, 255, 255, 0.85);`);

// Fix bento items text if any (they are dark cards)
css = css.replace(/\.bento-title \{\n  font-family: var\(--font-serif\);\n  font-size: 1\.8rem;\n  color: var\(--primary-gold\);/g, `.bento-title {\n  font-family: var(--font-serif);\n  font-size: 1.8rem;\n  color: var(--text-main);`);
css = css.replace(/\.bento-desc \{\n  font-size: 0\.95rem;\n  color: var\(--text-muted\);/g, `.bento-desc {\n  font-size: 0.95rem;\n  color: rgba(255, 255, 255, 0.85);`);

// Just in case there are missing texts in footer:
css = css.replace(/\.footer-title \{\n  font-size: 1\.1rem;\n  color: var\(--text-main\); opacity: 0\.9;\n  margin-bottom: 1\.25rem;\n  text-transform: uppercase;/g, `.footer-title {\n  font-size: 1.1rem;\n  color: var(--text-main);\n  margin-bottom: 1.25rem;\n  text-transform: uppercase;`);

fs.writeFileSync(cssPath, css, 'utf8');
