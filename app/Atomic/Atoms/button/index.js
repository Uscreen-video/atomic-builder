import atom from 'Editor/atom';
import { shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'button',
    content: 'Your text',
    settings: {
      backgroundColor: shape.color('#E6E6E6'),
      align: shape.align(),
      padding: shape.padding(),
      url: shape.link(),
      border: shape.border({ width: 0, style: 'solid', color: '#000', radius: 0 }),
      shadow: shape.shadow({ x: 0, y: 0, blur: 0, spread: 0, color: '#333' })
    }
  }
});
