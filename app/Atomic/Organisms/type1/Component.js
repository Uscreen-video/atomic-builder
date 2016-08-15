import styles from './styles.css';

export default ({
  molecules,
  settings
}) => (
  <div className={styles.wrap} style={{
    background: settings.get('backgroundImage') && `url(${settings.get('backgroundImage')[0]}) 0 0 no-repeat`,
    backgroundColor: settings.get('backgroundColor'),
    padding: settings.get('padding')
  }}>
    <div className={styles.container}>
      {molecules.get('Main')}
    </div>
  </div>
);
