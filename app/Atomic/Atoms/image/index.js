import atom from 'Editor/atom';
import { shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'image',
    content: require('./default.png'),
    settings: {
      padding: shape.padding()
    }
  }
});
