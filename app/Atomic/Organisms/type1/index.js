import organism from 'Editor/organism';
import { shape as Shape } from 'Editor/creators/createShape';
import styles from './styles.css';

export default organism({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'type1',
    molecules: {
      Main: {
        type: 'static',
        theme: {
          wrap: styles.moleculeWrap
        }
      }
    },
    settings: {
      colors: Shape.color({ background: '#fff', color: '' }),
      backgroundImage: Shape.background({ url: '', x: 0, y: 0, repeat: 'no-repeat', size: 'auto' }),
      spacing: Shape.spacing({
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        padding: { top: 50, right: 10, bottom: 50, left: 10 }
      })
    }
  }
});
