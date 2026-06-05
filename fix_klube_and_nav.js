const fs = require('fs');
const path = require('path');

// 1. Fix o-klube.html inline styles
const oklubePath = path.join('c:/projects/astanachess/o-klube.html');
let html = fs.readFileSync(oklubePath, 'utf8');

// Left column (light background)
html = html.replace(/<p style="color: var\(--text-muted\); margin-bottom: 1rem;">/g, '<p style="color: var(--text-dark); opacity: 0.8; margin-bottom: 1rem;">');
html = html.replace(/<p style="color: var\(--text-muted\); font-weight: 500;">/g, '<p style="color: var(--text-dark); opacity: 0.8; font-weight: 500;">');
html = html.replace(/<li style="display: flex; align-items: center; gap: 8px; color: var\(--text-main\);">/g, '<li style="display: flex; align-items: center; gap: 8px; color: var(--text-dark);">');

// Right column (dark background .card)
html = html.replace(/<p><strong>Б\. Асаубаева<\/strong><\/p>/g, '<p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"><strong>Б. Асаубаева</strong></p>');
html = html.replace(/<p><strong>М\. Камалиденова<\/strong><\/p>/g, '<p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"><strong>М. Камалиденова</strong></p>');
html = html.replace(/<p><strong>Алдияр Жауынбай<\/strong><\/p>/g, '<p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"><strong>Алдияр Жауынбай</strong></p>');
html = html.replace(/<p><strong>К\. Ногербек<\/strong><\/p>/g, '<p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"><strong>К. Ногербек</strong></p>');
html = html.replace(/<p><strong>А\. Кайрбекова<\/strong><\/p>/g, '<p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"><strong>А. Кайрбекова</strong></p>');
html = html.replace(/<p><strong>Аланна Бериккызы<\/strong><\/p>/g, '<p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"><strong>Аланна Бериккызы</strong></p>');

// Update text-muted in the card to be more readable white
html = html.replace(/<p style="font-size: 0\.85rem; color: var\(--text-muted\);">/g, '<p style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.8);">');

fs.writeFileSync(oklubePath, html, 'utf8');

// 2. Fix CSS nav layout
const cssPath = path.join('c:/projects/astanachess/assets/css/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/\.nav-links \{\n  display: flex;\n  gap: 32px;\n  margin-left: auto;\n  margin-right: 40px;\n\}/g, `.nav-links {\n  display: flex;\n  gap: 16px;\n  margin-left: auto;\n  margin-right: 20px;\n}`);
css = css.replace(/\.nav-links \{\n  display: flex;\n  gap: 32px;\n\}/g, `.nav-links {\n  display: flex;\n  gap: 16px;\n  margin-left: auto;\n  margin-right: 20px;\n}`);

css = css.replace(/\.nav-links a \{\n  font-size: 0\.95rem;\n  font-weight: 500;\n  color: var\(--text-dark\);\n  opacity: 0\.7;\n\}/g, `.nav-links a {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--text-dark);\n  opacity: 0.8;\n  white-space: nowrap;\n}`);

css = css.replace(/\.logo \{\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var\(--font-serif\);\n  font-size: 1\.4rem;/g, `.logo {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-serif);\n  font-size: 1.2rem;`);

fs.writeFileSync(cssPath, css, 'utf8');
