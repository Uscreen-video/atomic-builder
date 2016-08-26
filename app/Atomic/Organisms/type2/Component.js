import getStyles from 'Editor/helpers/getStyles';
import styles from './styles.css';

export default ({
  settings,
  molecules
}) => {
  const { leftImage, leftImageSize, ...style } = getStyles(settings);
  return (
    <div
      className={styles.wrap}
      style={style}>
      <div className={styles.container}>
        <div className={styles.leftSide} style={{ background: leftImage, backgroundSize: leftImageSize }} />
        <div className={styles.rightSide}>
          <div className={styles.rightSideComtainer}>
            {molecules.get('Main')}
          </div>
        </div>
      </div>
    </div>
  );
}
