import styles from './styles.css';

const getStyles = settings => {
  const res = {
    backgroundColor: settings.get('backgroundColor')
  };

  const padding = settings.get('padding');
  if (padding) {
    const { top, right, bottom, left } = padding;
    res.padding = `${top}px ${right} ${bottom} ${left}`;
  }

  const backgroundImage = settings.get('backgroundImage');
  if (backgroundImage) {
    const [url, cover, { x, y }, repeat] = backgroundImage;
    res.background = `url(${url}) ${x} ${y} ${repeat} ${settings.get('backgroundColor')}`;
    res.backgroundSize = cover;
  }

  return res;
};

export default ({
  settings,
  molecules
}) => (
  <div
    className={styles.wrap}
    style={getStyles(settings)}>
    <div className={styles.container}>
      <div className={styles.sideLeft}>
        <div className={styles.rightSideContainer}>
          {molecules.get('Main')}
        </div>
      </div>
      <div className={styles.sideRight}>
        <div className={styles.rightSideContainer}>
          {molecules.get('Second')}
        </div>
      </div>
    </div>
  </div>
);
