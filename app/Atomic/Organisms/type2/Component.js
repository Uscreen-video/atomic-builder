import styles from './styles.css';

export default ({
  settings,
  molecules
}) => (
  <div className={styles.wrap} style={{ backgroundColor: settings.get('background') }}>
    <div className={styles.container}>
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <div className={styles.rightSideComtainer}>
          {molecules.get('Main')}
        </div>
      </div>
    </div>
  </div>
);
