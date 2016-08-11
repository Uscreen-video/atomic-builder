import styles from './styles.css';

export default ({
  molecules,
  settings
}) => (
  <div className={styles.wrap} style={{
    backgroundColor: settings.get('backgroundColor'),
    padding: settings.get('padding')
  }}>
    <div className={styles.container}>
      {molecules.get('Main')}
    </div>
  </div>
);
