import styles from './styles.css';

export default ({
  settings,
  molecules
}) => {
  const Main = molecules.get('Main');
  return (
    <div className={styles.wrap} styles={{ backgroundColor: settings.background }}>
      <div className={styles.container}>
        <div className={styles.leftSide} />
        <div className={styles.rightSide}>
          <div className={styles.rightSideComtainer}>
            <Main theme={{ wrap: styles.moleculeWrap, container: styles.moleculeContainer }} />
          </div>
        </div>
      </div>
    </div>
  );
};
