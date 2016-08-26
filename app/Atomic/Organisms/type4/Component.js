import getStyles from 'Editor/helpers/getStyles';
import styles from './styles.css';

export default ({
  settings,
  molecules
}) => (
  <div
    className={styles.wrap}
    style={getStyles(settings)}>
    <div className={styles.container}>
      <div className={styles.side}>
        <div className={styles.rightSideContainer}>
          {molecules.get('Main')}
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.rightSideContainer}>
          {molecules.get('Second')}
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.rightSideContainer}>
          {molecules.get('Third')}
        </div>
      </div>
    </div>
  </div>
);
