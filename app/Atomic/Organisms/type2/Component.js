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
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <div className={styles.rightSideComtainer}>
          {molecules.get('Main')}
        </div>
      </div>
    </div>
  </div>
);
