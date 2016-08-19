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
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <div className={styles.rightSideComtainer}>
          {molecules.get('Main')}
        </div>
      </div>
    </div>
  </div>
);
