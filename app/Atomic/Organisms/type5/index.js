import organism from 'Editor/organism';
import { shape as Shape } from 'Editor/creators/createShape';

export default organism({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'type5',
    molecules: {
      Main: {
        type: 'static'
      }
    },
    settings: {
      colors: Shape.color({ background: '#fff', color: '' }),
      leftImage: Shape.background({ url: '', x: 0, y: 0, repeat: 'no-repeat', size: 'auto'
      }, { title: 'Main image:' }),
      backgroundImage: Shape.background({ url: '', x: 0, y: 0, repeat: 'no-repeat', size: 'auto' }),
      spacing: Shape.spacing({
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        padding: { top: 0, right: 0, bottom: 0, left: 0 }
      })
    }
  }
});
