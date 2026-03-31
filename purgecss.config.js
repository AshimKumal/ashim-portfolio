module.exports = {
  content: [
    './*.html',
    './shared-ui.js',
    './script.js'
  ],
  css: ['./styles.css'],
  output: './styles.purged.css',
  safelist: {
    standard: [
      'active', 
      'scrolled', 
      'navbar', 
      'nav-links', 
      'mobile-menu-btn', 
      'ph-x', 
      'ph-list',
      'cursor-hover',
      'cursor-text'
    ],
    deep: [],
    greedy: [/^ph-/] // Safelist all phosphor icons
  },
  extractors: [
    {
      extractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      extensions: ['html', 'js']
    }
  ]
}
