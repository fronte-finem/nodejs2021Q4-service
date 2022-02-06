import { resolve, dirname } from 'path';
import { Readable } from 'stream';
import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

class UserGenerator extends Readable {
  constructor(max = 1000) {
    super();
    this._max = max;
    this._index = 0;
  }

  _read(size) {
    this._index += 1;
    if (this._index === 1) {
      this.push('name,login,password');
      return;
    }
    if (this._index > this._max) {
      this.push(null);
      return;
    }
    const line = this._generate();
    const buff = Buffer.from(`\n${line}`, 'ascii');
    this.push(buff);
  }

  _generate() {
    const name = btoa(String(Math.random())).slice(5, 15);
    const login = btoa(String(Math.random())).slice(5, 20);
    const password = btoa(String(Math.random())).slice(5);
    return `${name},${login},${password}`;
  }
}

async function generateUsersCsv(recordsNum = 100) {
  const userGenerator = new UserGenerator(recordsNum);
  const dir = dirname(fileURLToPath(import.meta.url));
  const file = resolve(dir, 'users.csv');
  const fd = await open(file, 'w');
  return pipeline(userGenerator, fd.createWriteStream());
}

const recordsNum = Number(process.argv[2]) || 100;
await generateUsersCsv(recordsNum);
