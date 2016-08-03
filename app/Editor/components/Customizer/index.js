import styles from './styles.css';
import cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';

import Button from './button';

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
      <div className={styles.verticalBorder} />
      <div className={styles.horizontalBorder} />
      <Button title={title} className={cx(styles.title, styles.title_settings, outside && styles.outside)} />
    </div>
  </div>
));
