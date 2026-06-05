const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = 'c:/projects/astanachess/assets/img/trainers/';

if (!fs.existsSync(imgDir)){
    fs.mkdirSync(imgDir, { recursive: true });
}

const images = {
    'Аблай Есимгалиевич': 'https://astanachess.kz/wp-content/uploads/2024/12/img-3-1.jpg',
    'Ержан Жаксылыкович ШАКЕНОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-1-1-400x400.jpg',
    'Гульнара Сериковна ЖУМАГУЛОВА': 'https://astanachess.kz/wp-content/uploads/2024/11/people-2-400x400.jpg',
    'Азамат Габитович АУБАКИРОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-3-400x400.jpg',
    'Диас Токашевич ИСАБАЕВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-4-400x400.jpg',
    'Нурлан Болатович ИБРАЕВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-5-400x400.jpg',
    'Еркін Аманбаұлы ҚОЗҒАНБАЙ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-6-400x400.jpg',
    'Арнұр Төлеубайұлы ЖАНДІЛДИНОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-7-400x400.jpg',
    'Вюгар Муслимоглы ГУСЕЙНОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-8-400x400.jpg',
    'Мадияр Амантаевич ЖУСУПБЕКОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-9-400x400.jpg',
    'Андрей Висарионович КВАН': 'https://astanachess.kz/wp-content/uploads/2024/11/people-10-400x400.jpg',
    'Серик Рамакович АБДРАХМАНОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-11-400x400.jpg',
    'Акжан Кенжетаевич ШОПАНОВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-12-400x400.jpg',
    'Мурат Кубайдоллинович КАШЕВ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-13-400x400.jpg',
    'Алдияр АНСАТ': 'https://astanachess.kz/wp-content/uploads/2024/11/people-14-400x400.jpg',
    'Ногербек КАЗЫБЕК': 'https://astanachess.kz/wp-content/uploads/2024/11/people-15-400x400.jpg',
    'Амина КАИРБЕКОВА': 'https://astanachess.kz/wp-content/uploads/2024/11/people-16-400x400.jpg',
    'Меруерт КАМАЛИДЕНОВА': 'https://astanachess.kz/wp-content/uploads/2024/11/people-17-400x400.jpg'
};

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function process() {
    let htmlFiles = ['c:/projects/astanachess/trenery.html', 'c:/projects/astanachess/index.html'];
    
    for (const [name, url] of Object.entries(images)) {
        const ext = path.extname(url);
        // clean up name for filename
        const safeName = name.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_').replace(/_+/g, '_').toLowerCase();
        const filename = `${safeName}${ext}`;
        const dest = path.join(imgDir, filename);
        
        console.log(`Downloading ${filename} for ${name}...`);
        await download(url, dest);
        
        const localUrl = `assets/img/trainers/${filename}`;
        
        // update html
        htmlFiles.forEach(htmlFile => {
            if(fs.existsSync(htmlFile)) {
                let content = fs.readFileSync(htmlFile, 'utf8');
                // Regex to find <img> src near the name.
                // We will just look for the block containing the name and replace its image.
                // A bit tricky with regex, simpler is to just find all <img src="assets/img/placeholder..."> and replace if the same block has the name.
                // Since our HTML is structured like:
                // <img src="assets/img/placeholder.jpg" alt="NAME">
                // OR
                // <h3 class="trainer-card__name">NAME</h3> ... <img src="...">
                // Actually the alt text has the name! Let's check alt text first.
                
                // Method 1: Replace placeholder based on alt text
                // Regex matching <img ... alt="Ержан Жаксылыкович ШАКЕНОВ" ... src="assets/img/placeholder.jpg">
                // Actually, just find the name in the file, and the closest <img src="..."> before it.
                
                // Let's do a more robust string replacement:
                // We split the content by <img 
                // Then if a block contains the name, we replace its src.
                
                let altRegex = new RegExp(`(<img[^>]*alt="${name}"[^>]*src=")[^"]+(")`, 'g');
                let newContent = content.replace(altRegex, `$1${localUrl}$2`);
                
                // What if alt doesn't match exactly? Let's check alt="Аблай Есимгалиевич" vs alt="Аблай Есимгалиевич ТАСТАМБЕКОВ"
                // Let's do a broader search: find <div class="trainer-card">...</div> blocks.
                
                let blocks = newContent.split(/(<div class="trainer-card[^>]*>)/);
                for(let i=1; i<blocks.length; i+=2) {
                    let blockHeader = blocks[i];
                    let blockBody = blocks[i+1];
                    if(blockBody && blockBody.includes(name)) {
                        blockBody = blockBody.replace(/src="assets\/img\/[^"]+"/g, `src="${localUrl}"`);
                        blocks[i+1] = blockBody;
                    }
                }
                newContent = blocks.join('');
                
                if (content !== newContent) {
                    fs.writeFileSync(htmlFile, newContent, 'utf8');
                    console.log(`Updated ${htmlFile} for ${name}`);
                }
            }
        });
    }
    console.log("Done");
}

process().catch(console.error);
