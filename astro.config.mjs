import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://abbayram.github.io';
const base = process.env.SITE_BASE || '/dheads';

export default defineConfig({
  site,
  base,
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      assetsInlineLimit: 4096
    }
  }
});
