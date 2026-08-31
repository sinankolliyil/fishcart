const fs = require('fs');
const content = fs.readFileSync('src/data/catalogData.ts', 'utf8');

let count = 0;
const newContent = content.replace(/imageSrc:\s*["'][^"']+["']/g, () => {
    const imgIndex = (count % 8) + 1;
    count++;
    return `imageSrc: "/assets/${imgIndex}_image.png"`;
});

fs.writeFileSync('src/data/catalogData.ts', newContent);
console.log('Replaced', count, 'images');
