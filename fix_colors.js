const fs = require('fs');

const cssPath = 'c:/projects/astanachess/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Tone down the warmth, fix text colors
css = css.replace(/--bg-main: #F3ECE4;/g, '--bg-main: #FAFAF8;');
css = css.replace(/--bg-card: #45372C;/g, '--bg-card: #3D342B;');
css = css.replace(/--bg-card-hover: #544436;/g, '--bg-card-hover: #4A4036;');
css = css.replace(/--bg-nav: rgba\(243, 236, 228, 0\.95\);/g, '--bg-nav: rgba(250, 250, 248, 0.95);');

// Fix invisible text in nav and header
css = css.replace(/\.logo \{\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var\(--font-serif\);\n  font-size: 1.4rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  color: var\(--text-main\);/g, `.logo {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--font-serif);\n  font-size: 1.4rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  color: var(--text-dark);`);

css = css.replace(/\.nav-links a \{\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: var\(--text-muted\);/g, `.nav-links a {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: var(--text-dark);\n  opacity: 0.7;`);

css = css.replace(/\.nav-links a:hover,\n\.nav-links a\.active \{\n  color: var\(--text-main\);\n\}/g, `.nav-links a:hover,\n.nav-links a.active {\n  color: var(--text-dark);\n  opacity: 1;\n}`);

css = css.replace(/\.menu-toggle \{\n  display: none;\n  background: none;\n  border: none;\n  color: var\(--text-main\);/g, `.menu-toggle {\n  display: none;\n  background: none;\n  border: none;\n  color: var(--text-dark);`);

css = css.replace(/\.lang-switcher a \{\n  color: var\(--text-muted\);/g, `.lang-switcher a {\n  color: var(--text-dark);\n  opacity: 0.7;`);
css = css.replace(/\.lang-switcher a\.active \{\n  color: var\(--text-main\);\n  background-color: var\(--primary-gold-glow\);\n  border: 1px solid var\(--border-color\);\n\}/g, `.lang-switcher a.active {\n  color: var(--text-dark);\n  opacity: 1;\n  background-color: var(--primary-gold-glow);\n}`);

fs.writeFileSync(cssPath, css, 'utf8');

const htmlPath = 'c:/projects/astanachess/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Revert Hero Section to center-aligned text without the image
const heroRegex = /<section class="hero reveal-up" id="hero-section"[\s\S]*?<\/section>/;
const newHero = `<section class="hero reveal-up" id="hero-section" style="background: none; padding-top: 180px; padding-bottom: 120px; min-height: auto; text-align: center;">
      <div class="container">
        <div class="hero-content" style="max-width: 800px; margin: 0 auto;">
          <span class="hero-tagline" data-i18n="hero_tagline" style="color: var(--primary-gold-dark);">Центральный Шахматный Клуб</span>
          <h1 class="hero-title" data-i18n="hero_title" style="color: var(--text-dark);">Воспитываем чемпионов мира с 2021 года</h1>
          <p class="hero-description" data-i18n="hero_desc" style="color: var(--text-dark); opacity: 0.8; margin-bottom: 2.5rem;">ЦШК «ASTANA» — одна из лучших шахматных школ Евразии с уникальной методикой тренировок, профессиональным оборудованием и сильнейшим тренерским составом.</p>
          <div class="hero-actions" style="justify-content: center;">
            <a href="obuchenie.html" class="btn btn-primary" id="hero-learn-more-btn" data-i18n="btn_courses" style="border-radius: 30px;">Направления обучения</a>
            <button class="btn btn-secondary open-modal" id="hero-callback-btn" data-i18n="btn_trial" style="border-radius: 30px; border-color: var(--text-dark); color: var(--text-dark);">Записаться на урок</button>
          </div>
        </div>
      </div>
    </section>`;

html = html.replace(heroRegex, newHero);
fs.writeFileSync(htmlPath, html, 'utf8');
