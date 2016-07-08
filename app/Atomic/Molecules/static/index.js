import molecule from 'Editor/molecule';
import styles from './styles.css';

export default molecule({
  component: require('./Component').default,
  props: {
    type: 'static',
    settings: {}
  }
});
