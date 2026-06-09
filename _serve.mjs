import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { extname, join, normalize } from 'path';

const ROOT = process.cwd();
const PORT = 5204;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon', '.md': 'text/markdown; charset=utf-8'
};

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const fp = normalize(join(ROOT, p));
    if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
    const s = await stat(fp).catch(() => null);
    if (!s || !s.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('404'); }
    const data = await readFile(fp);
    res.writeHead(200, { 'Content-Type': MIME[extname(fp).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
    res.end(data);
  } catch (e) {
    res.writeHead(500); res.end('500: ' + e.message);
  }
}).listen(PORT, () => console.log('Servidor en http://localhost:' + PORT));
