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
      backgroundColor: Shape.color('#fff'),
      backgroundImage: Shape.background(['', 'auto']),
      padding: Shape.padding([0, 0, 0, 0])
    }
  }
});
