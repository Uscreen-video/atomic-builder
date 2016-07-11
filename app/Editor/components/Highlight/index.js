import styles from './styles.css';
import cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('over', 'setOver', false),
  withHandlers({
    mouseOver: props => e => {
      e.stopPropagation();
      props.setOver(true);
    },
    mouseOut: props => e => {
      e.stopPropagation();
      props.setOver(false);
    }
  })
)(({
  outside,
  children,
  over,
  title,
  mouseOver,
  isDragging,
  mouseOut
}) => (
  <div
    className={styles.wrap}
    onMouseOver={mouseOver}
    onMouseOut={mouseOut}>
    <div>
      {children}
    </div>
    <div className={cx(styles.border, over && styles.over)}>
      <div className={styles.vertiacalBorder} />
      <div className={styles.horizontalBorder} />
      <div className={cx(styles.title, outside && styles.outside)}>{title}</div>
    </div>
  </div>
));
