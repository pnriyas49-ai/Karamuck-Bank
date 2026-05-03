import fs from 'fs';
import path from 'path';

// Helper to read a directory of JSON files (collections)
export function getCollection(collectionName: string) {
  try {
    const dirPath = path.join(process.cwd(), `src/content/${collectionName}`);
    if (!fs.existsSync(dirPath)) return [];

    const files = fs.readdirSync(dirPath);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const slug = file.replace('.json', '');
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return {
          slug,
          entry: JSON.parse(fileContent),
        };
      });
  } catch (error) {
    console.error(`Error reading collection ${collectionName}:`, error);
    return [];
  }
}

// Helper to read a single JSON file (singletons)
export function getSingleton(singletonName: string) {
  try {
    const filePath = path.join(process.cwd(), `src/content/${singletonName}.json`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading singleton ${singletonName}:`, error);
    return null;
  }
}
