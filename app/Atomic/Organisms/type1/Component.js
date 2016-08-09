import styles from './styles.css';

export default ({
  settings,
  molecules
}) => (
  <div className={styles.wrap} style={{ backgroundColor: settings.get('background') }}>
    <div className={styles.container}>
      {molecules.get('Main')}
    </div>
  </div>
);
