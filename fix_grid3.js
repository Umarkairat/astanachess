const fs = require('fs');

const cssPath = 'c:/projects/astanachess/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Ensure grid-3 stacks on mobile (max-width: 768px or 1024px)
if (!css.includes('.grid-3 {\n    grid-template-columns: 1fr;\n  }')) {
    css = css.replace(/@media \(max-width: 1024px\) \{([\s\S]*?)\}/, `@media (max-width: 1024px) {\n  .grid-3 {\n    grid-template-columns: repeat(2, 1fr);\n  }\n$1}`);
    css = css.replace(/@media \(max-width: 768px\) \{([\s\S]*?)\}/, `@media (max-width: 768px) {\n  .grid-3 {\n    grid-template-columns: 1fr;\n  }\n$1}`);
}

fs.writeFileSync(cssPath, css, 'utf8');
