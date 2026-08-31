const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
const srcDir = path.join(__dirname, 'src');

if (!fs.existsSync(assetsDir)) {
  console.log("Assets directory not found.");
  process.exit(1);
}

// Get all files in assets directory
const files = fs.readdirSync(assetsDir);
const assetFiles = files.filter(f => fs.statSync(path.join(assetsDir, f)).isFile());

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const srcFiles = getAllFiles(srcDir, []);
let allContent = '';
srcFiles.forEach(file => {
  allContent += fs.readFileSync(file, 'utf8') + '\n';
});

const unusedFiles = [];
assetFiles.forEach(file => {
  // Exclude some common icons/logos if they might be dynamically referenced, 
  // but looking for the literal filename usually works.
  if (!allContent.includes(file)) {
    unusedFiles.push(file);
  }
});

console.log("Found " + unusedFiles.length + " unused files:");
unusedFiles.forEach(file => console.log(" - " + file));

unusedFiles.forEach(file => {
  fs.unlinkSync(path.join(assetsDir, file));
});
console.log("Deleted all unused files.");
