import getStyles from 'Editor/helpers/getStyles';
import styles from './styles.css';

export default ({
  molecules,
  settings
}) => (
  <div
    className={styles.wrap}
    style={getStyles(settings)}>
    <div className={styles.container}>
      {molecules.get('Main')}
    </div>
  </div>
);
