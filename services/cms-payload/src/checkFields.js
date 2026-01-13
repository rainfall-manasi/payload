import fs from 'fs';
import path from 'path';

const collectionsDir = path.join(process.cwd(), 'collections');

function checkFields(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  const regex = /fields\s*:\s*\[([\s\S]*?)\]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const fieldsBlock = match[1];
    const fieldRegex = /{([\s\S]*?)}/g;
    let fieldMatch;
    let index = 0;

    while ((fieldMatch = fieldRegex.exec(fieldsBlock)) !== null) {
      index++;
      const fieldContent = fieldMatch[1];
      if (!/name\s*:/m.test(fieldContent)) {
        console.log(`Missing name in ${filePath}, field index ${index}`);
      }
    }
  }
}

fs.readdirSync(collectionsDir).forEach((file) => {
  const fullPath = path.join(collectionsDir, file);
  if (fs.statSync(fullPath).isFile() && fullPath.endsWith('.ts')) {
    checkFields(fullPath);
  }
});
