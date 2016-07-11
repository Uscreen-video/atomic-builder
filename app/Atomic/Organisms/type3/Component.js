import styles from './styles.css';

export default ({
  settings,
  molecules
}) => {
  const Main = molecules.get('Main');
  const Second = molecules.get('Second');
  const Third = molecules.get('Third');
  const Forth = molecules.get('Forth');
  return (
    <div className={styles.wrap} styles={{ backgroundColor: settings.background }}>
      <div className={styles.container}>
        <div className={styles.side}>
          <div className={styles.rightSideComtainer}>
            <Main theme={{ wrap: styles.moleculeWrap, container: styles.moleculeContainer }} />
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.rightSideComtainer}>
            <Second theme={{ wrap: styles.moleculeWrap, container: styles.moleculeContainer }} />
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.rightSideComtainer}>
            <Third theme={{ wrap: styles.moleculeWrap, container: styles.moleculeContainer }} />
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.rightSideComtainer}>
            <Forth theme={{ wrap: styles.moleculeWrap, container: styles.moleculeContainer }} />
          </div>
        </div>
      </div>
    </div>
  );
};
