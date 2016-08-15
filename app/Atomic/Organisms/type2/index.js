import organism from 'Editor/organism';
import { shape as Shape } from 'Editor/creators/createShape';

export default organism({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'type2',
    molecules: {
      Main: {
        type: 'static'
      }
    },
    settings: {
      backgroundColor: Shape.color('#fff'),
      backgroundImage: Shape.background(['', 'auto']),
      padding: Shape.padding([0, 0, 0, 0])
    }

  }
});
