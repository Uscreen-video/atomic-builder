import organism from 'Editor/organism';
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
    settings: {}
  }
});
