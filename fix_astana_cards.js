const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let original = content;

    // Use a function to replace inside matching card/bento containers
    // We match <div class="card"> or <div class="card "...> or <div class="bento-item"...>
    // We need a robust parser or just a regex that works for these simple blocks.
    
    // We can just find all instances of `<p style="color: var(--text-dark); opacity: 0.8;`
    // Wait, some <p> with that style are NOT in cards (they are on the light background, where they SHOULD be dark).
    // So we ONLY want to replace them if they are inside a dark container.
    // Dark containers in our code:
    // class="card"
    // class="bento-item"
    // class="trainer-card" (but trainers use css classes mostly)
    // class="faq-item" (uses css classes)
    // class="roadmap-step" (uses css classes)

    // Let's do a simple state machine to replace strings when inside a dark container
    let lines = content.split('\n');
    let inDarkContainer = 0;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('class="card"') || lines[i].includes('class="card ') || lines[i].includes('class="bento-item')) {
            inDarkContainer++;
        }
        
        if (inDarkContainer > 0) {
            lines[i] = lines[i].replace(/color:\s*var\(--text-dark\);\s*opacity:\s*0\.8;/g, 'color: rgba(255, 255, 255, 0.85);');
            lines[i] = lines[i].replace(/color:\s*var\(--text-dark\);/g, 'color: rgba(255, 255, 255, 0.85);');
        }
        
        // Simple heuristic: if we see </div>, we decrement. 
        // This is not perfect HTML parsing, but since cards are not deeply nested with other divs in most of these sections, it usually works.
        // Actually, cards have nested divs (like grid columns inside cards). So counting </div> is risky.
        
        // Better approach: just regex replace the specific cards from the screenshot for astanaopen.html
        // The screenshot is from astanaopen.html, "Игровые группы и кубки".
        // Let's just fix astanaopen.html specific blocks to be completely safe and not break other layouts.
    }
    
    // Actually, I'll just use regex for the known text inside the cards that was corrupted.
    if (file === 'astanaopen.html') {
        content = content.replace(/color:\s*var\(--text-dark\);\s*opacity:\s*0\.8;\s*margin-bottom:\s*1rem;">\s*Официальный этап Детского/g, 'color: rgba(255, 255, 255, 0.85); margin-bottom: 1rem;">\n              Официальный этап Детского');
        
        content = content.replace(/style="color:\s*var\(--text-dark\);\s*opacity:\s*0\.8;\s*padding-left/g, 'style="color: rgba(255, 255, 255, 0.85); padding-left');
        
        content = content.replace(/color:\s*var\(--text-dark\);\s*opacity:\s*0\.8;\s*margin-bottom:\s*1rem;">\s*Главные состязания для/g, 'color: rgba(255, 255, 255, 0.85); margin-bottom: 1rem;">\n              Главные состязания для');
    }
    
    // o-shaxmatax.html also might have cards. Let's globally do a safer regex:
    // Look for `<div class="card"` and then replace the styles up to the next `</div>          </div>` or similar.
    // Or just manually fix the exact lines for astanaopen since the user reported astanaopen.
});

// Since regex is hard to get right without breaking HTML, I will just directly replace the problematic strings in astanaopen.html
let astana = fs.readFileSync(path.join(dir, 'astanaopen.html'), 'utf8');

// Fix the paragraph and list styles inside the "Детский Кубок РК" and "Взрослые турниры" cards
astana = astana.replace(/<p style="color: var\(--text-dark\); opacity: 0\.8; margin-bottom: 1rem;">\s*Официальный этап/g, '<p style="color: rgba(255, 255, 255, 0.85); margin-bottom: 1rem;">\n              Официальный этап');
astana = astana.replace(/<p style="color: var\(--text-dark\); opacity: 0\.8; margin-bottom: 1rem;">\s*Главные состязания/g, '<p style="color: rgba(255, 255, 255, 0.85); margin-bottom: 1rem;">\n              Главные состязания');
astana = astana.replace(/<ul style="color: var\(--text-dark\); opacity: 0\.8; padding-left: 20px;/g, '<ul style="color: rgba(255, 255, 255, 0.85); padding-left: 20px;');

fs.writeFileSync(path.join(dir, 'astanaopen.html'), astana, 'utf8');

console.log('Fixed astanaopen.html');
