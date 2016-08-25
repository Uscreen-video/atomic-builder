import organism from 'Editor/organism';
import { shape as Shape } from 'Editor/creators/createShape';

export default organism({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'type7',
    molecules: {
      Main: {
        type: 'static'
      },
      Second: {
        type: 'static'
      },
    },
    settings: {
      backgroundColor: Shape.color('#fff'),
      backgroundImage: Shape.background({ url: '', x: 0, y: 0, repeat: 'no-repeat', size: 'auto' }),
      padding: Shape.padding({ top: 0, right: 0, bottom: 0, left: 0 })
    }
  }
});
