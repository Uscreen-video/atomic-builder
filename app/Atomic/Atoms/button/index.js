import atom from 'Editor/atom';
import { shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'button',
    content: '',
    settings: {
      padding: shape.padding()
    }
  }
});
