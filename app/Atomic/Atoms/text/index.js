import atom from 'Editor/atom';
import { shape as Shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'text',
    content: '',
    settings: {
      backgroundColor: Shape.color('#fff'),
      backgroundImage: Shape.url(''),
      padding: Shape.padding([0, 0, 0, 0])
    }
  }
});
