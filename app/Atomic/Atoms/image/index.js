import atom from 'Editor/atom';
import { shape as Shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'image',
    content: require('./default.png'),
    settings: {
      align: Shape.align(),
      spacing: Shape.spacing({
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      }),
      border: Shape.border({ width: 0, style: 'solid', color: '#000', radius: 0 }),
      shadow: Shape.shadow({ x: 0, y: 0, blur: 0, spread: 0, color: '#333' })
    }
  }
});
