import styles from './styles.css';

export default ({
  settings,
  molecules
}) => (
  <div className={styles.wrap} style={{
    background: settings.get('backgroundImage') && `url(${settings.get('backgroundImage')[0]}) 0 0 ${settings.get('backgroundImage')[2]}`,
    backgroundColor: settings.get('backgroundColor'),
    padding: settings.get('padding')
  }}>
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
      <div className={styles.side}>
        <div className={styles.rightSideContainer}>
          {molecules.get('Forth')}
        </div>
      </div>
    </div>
  </div>
);
