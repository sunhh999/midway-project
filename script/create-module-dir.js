import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

if (process.argv.length > 3) {
  console.log('只能有一个参数');
  process.exit();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const moduleName = process.argv.pop();

mkdirSync(resolve(__dirname, `../src/module/${moduleName}`));
mkdirSync(resolve(__dirname, `../src/module/${moduleName}/controller`));
mkdirSync(resolve(__dirname, `../src/module/${moduleName}/service`));
mkdirSync(resolve(__dirname, `../src/module/${moduleName}/entity`));
mkdirSync(resolve(__dirname, `../src/module/${moduleName}/dto`));
mkdirSync(resolve(__dirname, `../src/module/${moduleName}/vo`));
