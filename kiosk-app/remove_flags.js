const fs = require('fs');

let typesFile = fs.readFileSync('src/types/catalog.ts', 'utf8');
typesFile = typesFile.replace(/  flag\?: .*\n/g, '');
fs.writeFileSync('src/types/catalog.ts', typesFile);

let dataFile = fs.readFileSync('src/data/catalogData.ts', 'utf8');
dataFile = dataFile.replace(/, flag: "[^"]+"/g, '');
fs.writeFileSync('src/data/catalogData.ts', dataFile);

console.log('Removed flags from data and types.');
