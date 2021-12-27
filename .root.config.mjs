import { resolve } from 'path';
import { fileURLToPath } from 'url';

export const ROOT_PATH = resolve(fileURLToPath(import.meta.url), '..');
