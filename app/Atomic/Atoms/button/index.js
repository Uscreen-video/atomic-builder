import atom from 'Editor/atom';
import { shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'button',
    content: 'Your text',
    groups: {
      spacing: 'Box spacing and alignment',
      border: 'Borders and shadows',
      colors: 'Colors',
      url: 'Add a link:'
    },
    settings: {
      colors: shape.color({ background: '#E6E6E6', color: '#333' }),
      align: shape.align(),
      padding: shape.padding(),
      font: shape.font({ weight: 400, size: 16, style: 'normal', family: 'Arial' }),
      border: shape.border({ width: 0, style: 'solid', color: '#000', radius: 0 }),
      shadow: shape.shadow({ x: 0, y: 0, blur: 0, spread: 0, color: '#333' }),
      url: shape.link({ url: '', target: '_blank' }, { title: '' })
    }
  }
});
