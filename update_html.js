const fs = require('fs');

const mappings = [
    { name: 'Аблай Е. ТАСТАМБЕКОВ', file: 'аблай_есимгалиевич.jpg' },
    { name: 'Гульнара С. ЖУМАГУЛОВА', file: 'гульнара_сериковна_жумагулова.jpg' },
    { name: 'Нурлан Б. ИБРАЕВ', file: 'нурлан_болатович_ибраев.jpg' },
    { name: 'Азамат Г. АУБАКИРОВ', file: 'азамат_габитович_аубакиров.jpg' },
    { name: 'Диас Т. ИСАБАЕВ', file: 'диас_токашевич_исабаев.jpg' },
    { name: 'Ержан Ж. ШАКЕНОВ', file: 'ержан_жаксылыкович_шакенов.jpg' },
    { name: 'Казыбек НОГЕРБЕК', file: 'ногербек_казыбек.jpg' },
    { name: 'Алдияр АНСАТ', file: 'алдияр_ансат.jpg' },
    { name: 'Меруерт КАМАЛИДЕНОВА', file: 'меруерт_камалиденова.jpg' },
    { name: 'Амина КАИРБЕКОВА', file: 'амина_каирбекова.jpg' },
    { name: 'Еркін ҚОЗҒАНБАЙ', file: 'ерк_н_аманба_лы_оз_анбай.jpg' },
    { name: 'Андрей В. КВАН', file: 'андрей_висарионович_кван.jpg' },
    { name: 'Арнұр ЖАНДІЛДИНОВ', file: 'арн_р_т_леубай_лы_жанд_лдинов.jpg' },
    { name: 'Вюгар М. ГУСЕЙНОВ', file: 'вюгар_муслимоглы_гусейнов.jpg' },
    { name: 'Акжан К. ШОПАНОВ', file: 'акжан_кенжетаевич_шопанов.jpg' },
    { name: 'Мурат К. КАШЕВ', file: 'мурат_кубайдоллинович_кашев.jpg' },
    { name: 'Мадияр А. ЖУСУПБЕКОВ', file: 'мадияр_амантаевич_жусупбеков.jpg' }
];

let htmlPath = 'c:/projects/astanachess/trenery.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// The file has blocks like:
// <div class="trainer-card" ...>
//   ...
//   <svg>...</svg>
//   ...
//   <h3 class="trainer-name text-gradient">NAME</h3>

let blocks = content.split(/(<div class="trainer-card" data-category="[^"]+">)/);

for (let i = 1; i < blocks.length; i += 2) {
    let blockHeader = blocks[i];
    let blockBody = blocks[i+1];
    
    for (let mapping of mappings) {
        if (blockBody.includes(mapping.name)) {
            // Replace the <svg> block
            const imgTag = `<img src="assets/img/trainers/${mapping.file}" alt="${mapping.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">`;
            blockBody = blockBody.replace(/<svg[\s\S]*?<\/svg>/, imgTag);
            blocks[i+1] = blockBody;
            break; // found the match
        }
    }
}

let newContent = blocks.join('');
fs.writeFileSync(htmlPath, newContent, 'utf8');
console.log("Replaced SVGs with downloaded images in trenery.html");
