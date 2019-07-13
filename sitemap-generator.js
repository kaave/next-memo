const path = require('path');
const sitemapGenerator = require('nextjs-sitemap-generator');

const baseUrl = 'https://kaave.github.io';

sitemapGenerator({
  baseUrl,
  pagesDirectory: path.join(__dirname, 'pages'),
  targetDirectory: 'static/',
});
