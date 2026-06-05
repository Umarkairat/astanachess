const fs = require('fs');

const cssPath = 'c:/projects/astanachess/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Fix FAQ Summary color (dark text on dark background issue)
css = css.replace(/\.faq-item summary \{([\s\S]*?)\}/, `.faq-item summary {$1  color: var(--text-main);\n}`);

// Fix FAQ Content color to be more visible
css = css.replace(/\.faq-content \{\n  padding: 0 24px 20px;\n  color: var\(--text-muted\);/g, `.faq-content {\n  padding: 0 24px 20px;\n  color: rgba(255, 255, 255, 0.85);`);

// Fix any missing text-main colors in cards globally
css = css.replace(/\.card-title \{\n  font-size: 1\.4rem;/g, `.card-title {\n  font-size: 1.4rem;\n  color: var(--text-main);`);
css = css.replace(/\.card-text \{\n  color: var\(--text-muted\);/g, `.card-text {\n  color: rgba(255, 255, 255, 0.85);`);

// Add margin to nav-links to push it away from logo if needed
css = css.replace(/\.nav-links \{\n  display: flex;\n  gap: 32px;/g, `.nav-links {\n  display: flex;\n  gap: 32px;\n  margin-left: auto;\n  margin-right: 40px;`);

// Also fix stats section label color on dark background
css = css.replace(/\.stat-label \{\n  font-size: 0\.95rem;\n  color: var\(--text-muted\);/g, `.stat-label {\n  font-size: 0.95rem;\n  color: rgba(255, 255, 255, 0.85);`);

// Make sure roadmap text is visible
css = css.replace(/\.step-title \{\n  font-size: 1\.3rem;/g, `.step-title {\n  font-size: 1.3rem;\n  color: var(--text-main);`);
css = css.replace(/\.step-desc \{\n  color: var\(--text-muted\);/g, `.step-desc {\n  color: rgba(255, 255, 255, 0.85);`);

fs.writeFileSync(cssPath, css, 'utf8');
