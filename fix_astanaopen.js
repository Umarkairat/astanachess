const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/astanachess/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let original = content;

    // Fix inline muted text on light backgrounds
    // Note: this assumes these specific inline styles are on light backgrounds unless they are inside a card.
    // To be safe, we'll replace common patterns found in the sections outside cards.
    
    content = content.replace(/color:\s*var\(--text-muted\);/g, 'color: var(--text-dark); opacity: 0.8;');
    
    // Some elements might have been white (text-main) on light backgrounds
    // For example, list items with checkmarks
    content = content.replace(/<li style="display: flex; align-items: center; gap: 8px; color: var\(--text-main\);">/g, '<li style="display: flex; align-items: center; gap: 8px; color: var(--text-dark);">');

    // Restore text-muted / text-main for elements INSIDE dark cards. 
    // Wait, earlier I fixed dark cards by adding classes in CSS (.trainer-desc, .card-text). 
    // If I globally replace var(--text-muted) with dark text, it might break inline styles inside dark cards if there are any.
    // Let's specifically look at astanaopen.html
    if (file === 'astanaopen.html') {
        // Fix the specific paragraphs shown in the screenshot
        // The text on the left is likely `<p style="color: var(--text-muted); ...">` or `<p class="subtitle" ...>`
        // Since we replaced all text-muted above, it should be dark now.
        
        // Let's make sure the dark card "Масштаб фестиваля" is still legible.
        // The text inside might have had text-muted inline. We replaced it with text-dark.
        // Let's fix it by targeting the dark card content specifically.
        content = content.replace(/<p style="font-size: 0\.85rem; color: var\(--text-dark\); opacity: 0\.8;">/g, '<p style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.8);">');
    }
    
    if (content !== original) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

// We need a more robust way to fix the dark card in astanaopen.html if the above regex fails.
let astana = fs.readFileSync(path.join(dir, 'astanaopen.html'), 'utf8');
// Replace dark text back to white inside the dark card
astana = astana.replace(/<div class="card"([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/, function(match) {
    let fixed = match.replace(/color:\s*var\(--text-dark\);\s*opacity:\s*0\.8;/g, 'color: rgba(255, 255, 255, 0.85);');
    return fixed;
});
fs.writeFileSync(path.join(dir, 'astanaopen.html'), astana, 'utf8');

console.log("Done");
