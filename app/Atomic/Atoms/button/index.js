import atom from 'Editor/atom';
import { shape as Shape } from 'Editor/creators/createShape';

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
      link: 'Add a link:'
    },
    settings: {
      align: Shape.align('left'),
      spacing: Shape.spacing({
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        padding: { top: 8, right: 16, bottom: 8, left: 16 }
      }),
      font: Shape.font({
        weight: 400,
        size: 16,
        style: 'normal',
        family: 'Arial',
        transform: 'none',
        decoration: 'none',
        lineHeight: 150,
        letterSpacing: 0,
        color: '#333'
      }),
      backgroundImage: Shape.background({
        url: '',
        x: 0,
        y: 0,
        repeat: 'no-repeat',
        size: 'auto',
        color: '#E6E6E6'
      }),
      border: Shape.border({ width: 0, style: 'solid', color: '#000', radius: 0 }),
      shadow: Shape.shadow({ x: 0, y: 0, blur: 0, spread: 0, color: '#333' }),
      link: Shape.link({ url: '', target: '_blank' }, { title: 'Add a link' })
    }
  }
});
