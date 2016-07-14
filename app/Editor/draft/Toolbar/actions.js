export const base = [
  { type: 'inline', label: 'B', style: 'BOLD', icon: 'bold' },
  { type: 'inline', label: 'I', style: 'ITALIC', icon: 'italic' },
  { type: 'inline', label: 'U', style: 'UNDERLINE', icon: 'underline' },
  { type: 'separator' },
  { type: 'entity', label: 'Link', style: 'link', icon: 'link' },
  { type: 'entity', label: 'Font', style: 'font', icon: 'font',
    collection: [
      'header-one', 'header-two', 'header-three', 'header-four'
    ]
  },
  { type: 'entity', label: 'Color', style: 'color', icon: 'color' },
  { type: 'separator' },
  { type: 'block', label: 'UL', style: 'unordered-list-item', icon: 'ul' },
  { type: 'block', label: 'OL', style: 'ordered-list-item', icon: 'ol' },
  { type: 'block', label: 'QT', style: 'blockquote', icon: 'quote' }
];

export const font = [
  { type: 'block', label: 'H1', style: 'header-one', icon: 'h1' },
  { type: 'block', label: 'H2', style: 'header-two', icon: 'h2' },
  { type: 'block', label: 'H3', style: 'header-three', icon: 'h3' },
  { type: 'block', label: 'H4', style: 'header-four', icon: 'h4' },
  { type: 'separator' }
];
