import atom from 'Editor/atom';
import { shape as Shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'video',
    content: 'http://www.w3schools.com/html/mov_bbb.mp4',
    settings: {
      align: Shape.align(),
      colors: Shape.color({ background: '#fff', color: '' }),
      backgroundImage: Shape.background(['', 'auto', { x: 0, y: 0 }, 'no-repeat']),
      padding: Shape.padding({ top: 0, right: 0, bottom: 0, left: 0 })
    }
  }
});
