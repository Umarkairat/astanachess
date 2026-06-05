const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:/projects/astanachess/assets/css/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Replace fonts and root
const rootRegex = /@import url\([\s\S]*?--header-height: 90px;\n\}/;
const newRoot = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

/* --- DESIGN SYSTEM & TOKENS --- */
:root {
  /* Colors */
  --bg-main: #F3ECE4;
  --bg-card: #45372C;
  --bg-card-hover: #544436;
  --bg-nav: rgba(243, 236, 228, 0.95);
  
  --primary-gold: #C5A880;
  --primary-gold-hover: #E2C49B;
  --primary-gold-dark: #8F7451;
  --primary-gold-glow: rgba(197, 168, 128, 0.15);
  
  --text-main: #FFFFFF;
  --text-muted: #D1C9C1;
  --text-dark: #2F241D;
  
  --border-color: transparent;
  --border-color-hover: transparent;
  
  --success: #34D399;
  --error: #F87171;
  
  /* Typography */
  --font-serif: 'Montserrat', sans-serif;
  --font-sans: 'Montserrat', sans-serif;
  
  /* Shadows & Radius */
  --shadow-sm: none;
  --shadow-md: 0 10px 30px rgba(69, 55, 44, 0.1);
  --shadow-gold: none;
  
  --radius-sm: 16px;
  --radius-md: 32px;
  --radius-lg: 40px;
  
  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Layout constraints */
  --container-width: 1200px;
  --header-height: 90px;
}`;
css = css.replace(rootRegex, newRoot);

// 2. Body background and text color
css = css.replace(/background-color: var\(--bg-main\);\n  color: var\(--text-main\);/g, "background-color: var(--bg-main);\n  color: var(--text-dark);");
// Update text-muted in subtitle
css = css.replace(/\.subtitle \{\n  font-size: 1.1rem;\n  color: var\(--text-muted\);/g, ".subtitle {\n  font-size: 1.1rem;\n  color: var(--text-dark); opacity: 0.8;");
// Update text gradient to just text-dark for sections
css = css.replace(/\.text-gradient \{[\s\S]*?\}/, ".text-gradient {\n  color: var(--text-dark);\n}");

// 3. Update headers color in dark section
css = css.replace(/\.section-dark \{[\s\S]*?\}/, ".section-dark {\n  background-color: #EBE1D5;\n}");
css = css.replace(/\.bento-item \{[\s\S]*?overflow: hidden;\n\}/, `.bento-item {
  background: var(--bg-card);
  border: none;
  border-radius: var(--radius-lg);
  padding: 40px;
  transition: var(--transition-normal);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}`);
css = css.replace(/\.card \{[\s\S]*?overflow: hidden;\n\}/, `.card {
  background-color: var(--bg-card);
  border: none;
  border-radius: var(--radius-lg);
  padding: 30px;
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}`);

// 4. Remove noise overlay and cursor
const noiseRegex = /\/\* Noise Overlay \*\/[\s\S]*?\}\n\n\/\* Custom Cursor \*\/[\s\S]*?\}\n\n/g;
css = css.replace(noiseRegex, "");

// 5. Update footer
css = css.replace(/\.footer \{\n  margin-top: auto;\n  background-color: #080809;/g, ".footer {\n  margin-top: auto;\n  background-color: var(--bg-card);\n  color: var(--text-main);");
css = css.replace(/\.footer-title \{\n  font-size: 1.1rem;\n  color: var\(--primary-gold\);/g, ".footer-title {\n  font-size: 1.1rem;\n  color: var(--text-main); opacity: 0.9;");

fs.writeFileSync(cssPath, css, 'utf8');

const jsPath = path.join('c:/projects/astanachess/assets/js/main.js');
let js = fs.readFileSync(jsPath, 'utf8');
const jsCursorRegex = /\/\/ --- CUSTOM CURSOR ---[\s\S]*?\/\/ --- SCROLL REVEAL ANIMATIONS ---/g;
js = js.replace(jsCursorRegex, "// --- SCROLL REVEAL ANIMATIONS ---");
fs.writeFileSync(jsPath, js, 'utf8');
