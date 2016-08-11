import molecule from 'Editor/molecule';
import styles from './styles.css';
import { shape as Shape } from 'Editor/creators/createShape';

export default molecule({
  component: require('./Component').default,
  props: {
    type: 'static',
    settings: {
      backgroundColor: Shape.color('#f00'),
      padding: Shape.padding([0, 0, 0, 0])
    }
  }
});
