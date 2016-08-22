export default {
  styleToHTML: {
    left: {
      start: '',
      end: ''
    },
    center: {
      start: '<span class="alignment--center">',
      end: '</span>'
    },
    right: {
      start: '<span class="alignment--right">',
      end: '</span>'
    }
  },
  blockToHTML: {
    PARAGRAPH: {
      start: '<p>',
      end: '</p>',
      empty: '<br>'
    }
  },
  entityToHTML: (entity, originalText) => {
    switch (entity.type) {
      case 'COLOR':
        return `<span style="color: ${entity.data.color}">${originalText}</span>`;
      case 'LINK':
        return `<a href="${entity.data.link}">${originalText}</a>`;
      default:
        return originalText;
    }
  }
};
