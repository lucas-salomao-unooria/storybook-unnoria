import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    styles: 'src/styles.css',
  },
  format: ['esm', 'cjs'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  onSuccess: async () => {
    const distDir = path.resolve(process.cwd(), 'dist');
    const filesToRemove = [
      'styles.mjs',
      'styles.mjs.map',
      'styles.cjs',
      'styles.cjs.map',
      'styles.d.ts',
      'styles.d.mts',
      'styles.d.cts',
    ];

    for (const file of filesToRemove) {
      const filePath = path.join(distDir, file);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          // Ignorar se não existir
        }
      }
    }
  },
});
