require('dotenv/config') // Not loaded on build for some reason

const defineConfig = require('cmless')

const primary = '#8e44ad'
const targetConfidence = process.env.VITE_TARGET_CONFIDENCE

module.exports = defineConfig({
  entry: `${__dirname}/src/index.jsx`,
  title: `${targetConfidence}% Confidence Interval`,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' },
    { rel: 'alternate icon', href: 'favicon.ico' },
    { rel: 'mask-icon', href: 'favicon.svg', color: primary },
    { rel: 'manifest', href: 'manifest.json' },
  ],
  meta: {
    description: `How accurate are you really when you think you have ${targetConfidence}% confidence in something?`,
    'theme-color': primary,
  },
  fonts: {
    text: 'Fira Sans',
  },
  theme: false,
  reset: false,
})
