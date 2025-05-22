const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Base domain
const hostname = 'https://consultadvizo.com';

// Define all your accessible routes
const links = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.5 },
  { url: '/terms-of-service', changefreq: 'yearly', priority: 0.5 }
];

// Create the writable stream
const writeStream = createWriteStream('./public/sitemap.xml');
const sitemap = new SitemapStream({ hostname });

sitemap.pipe(writeStream);
links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap).then(() => {
  console.log('✅ sitemap.xml successfully generated in /public with all routes');
});
