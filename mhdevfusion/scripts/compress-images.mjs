import sharp from "sharp";
import { readdir, stat, rename } from "fs/promises";
import path from "path";

const ROOT = path.resolve(process.cwd(), "public");
const MIN_BYTES = 150 * 1024;
const MAX_WIDTH = 1600;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let totalBefore = 0;
let totalAfter = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
  const { size } = await stat(file);
  if (size < MIN_BYTES) continue;

  const img = sharp(file);
  const meta = await img.metadata();
  let pipeline = sharp(file);
  if (meta.width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH });

  const tmp = file + ".tmp";
  if (ext === ".png") {
    await pipeline.png({ palette: true, quality: 85, compressionLevel: 9 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 72, mozjpeg: true }).toFile(tmp);
  }

  const { size: newSize } = await stat(tmp);
  if (newSize < size) {
    await rename(tmp, file);
    totalBefore += size;
    totalAfter += newSize;
    console.log(`${path.relative(ROOT, file)}: ${(size / 1024).toFixed(0)} KB -> ${(newSize / 1024).toFixed(0)} KB`);
  } else {
    const { unlink } = await import("fs/promises");
    await unlink(tmp);
    console.log(`${path.relative(ROOT, file)}: kept original (${(size / 1024).toFixed(0)} KB)`);
  }
}

console.log(`\nTotal: ${(totalBefore / 1024).toFixed(0)} KB -> ${(totalAfter / 1024).toFixed(0)} KB`);
