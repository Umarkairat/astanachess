const fs = require('fs');

let htmlPath = 'c:/projects/astanachess/trenery.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// We will do several string replacements.

// 1. Add class "director-card" to Ablay Tastambekov
// The block starts with <div class="trainer-card" data-category="management"> right after <!-- Ablay Tastambekov -->
content = content.replace(
    /<!-- Ablay Tastambekov -->\s*<div class="trainer-card" data-category="management">/,
    '<!-- Ablay Tastambekov -->\n          <div class="trainer-card director-card" data-category="management">'
);

// Add the quote for Ablay Tastambekov
// His block ends with </p>\n            </div>\n          </div>
const ablaySearch = /<p class="trainer-desc">Основатель ЦШК\. Более 10 лет являлся вице-президентом Казахстанской федерации шахмат, возглавлял городскую федерацию шахмат\.<\/p>/;
const ablayQuote = `<p class="trainer-desc">Основатель ЦШК. Более 10 лет являлся вице-президентом Казахстанской федерации шахмат, возглавлял городскую федерацию шахмат.</p>
              <div class="director-quote" data-i18n="director_quote">
                «Шахматы — один из эффективных инструментов интеллектуального развития».<br>
                <span style="font-size: 1rem; margin-top: 10px; display: block;">— Аблай Тастамбеков</span>
              </div>`;
content = content.replace(ablaySearch, ablayQuote);

// 2. Add heading for "Главный тренер и Директора филиалов" before Gulnara Zhumagulova
// But wait, Head Coach is "Ержан Ж. ШАКЕНОВ". He is currently under data-category="master".
// The user wants "Главный тренер" and "Директора филиалов" to be highlighted together, or at least have a heading.
// Let's add headings.

// Before Gulnara Zhumagulova:
content = content.replace(
    /<!-- Gulnara Zhumagulova -->/,
    '<h2 class="trainer-section-title" data-category="management" data-i18n="heading_branch_directors">Директора филиалов</h2>\n          <!-- Gulnara Zhumagulova -->'
);

// Before Yerzhan Shakenov:
content = content.replace(
    /<!-- --- MASTERS & GMs --- -->\s*<!-- Yerzhan Shakenov -->/,
    '<!-- --- MASTERS & GMs --- -->\n          <h2 class="trainer-section-title" data-category="master" data-i18n="heading_head_coach">Главный тренер</h2>\n          <!-- Yerzhan Shakenov -->'
);

// Wait, the user wants to group "Главный тренер" with the directors, or just highlight them.
// If "Главный тренер" is currently under "master", we can keep it there but give it a heading.
// Then before Kazybek Nogerbek:
content = content.replace(
    /<!-- Kazybek Nogerbek -->/,
    '<h2 class="trainer-section-title" data-category="master" data-i18n="heading_gms_masters">Гроссмейстеры и Мастера</h2>\n          <!-- Kazybek Nogerbek -->'
);

// Before Andrey Kvan (first coach):
content = content.replace(
    /<!-- --- COACHES & CMS --- -->\s*<!-- Andrey Kvan -->/,
    '<!-- --- COACHES & CMS --- -->\n          <h2 class="trainer-section-title" data-category="coach" data-i18n="heading_coaches_cms">Тренеры и КМС</h2>\n          <!-- Andrey Kvan -->'
);

// Write changes
fs.writeFileSync(htmlPath, content, 'utf8');
console.log("Updated trenery.html with layout enhancements.");
