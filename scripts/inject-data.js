const fs = require('fs');
const path = require('path');

const imageData = require('./image-urls.json');
const htmlTemplate = fs.readFileSync(path.join(__dirname, 'image-selector.html'), 'utf8');

const htmlWithData = htmlTemplate.replace(
  'IMAGE_DATA_PLACEHOLDER',
  JSON.stringify(imageData, null, 2)
);

fs.writeFileSync(path.join(__dirname, 'image-selector.html'), htmlWithData);

console.log('✅ HTML mis à jour avec les données des images');
console.log('\n📂 Ouvre le fichier dans ton navigateur :');
console.log('   scripts/image-selector.html');
