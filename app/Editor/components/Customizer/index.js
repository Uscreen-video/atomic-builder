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
  mouseOut,
  ...props
}) => (
  <div
    className={styles.wrap}
    onMouseOver={mouseOver}
    onMouseOut={mouseOut}>
    <div>
      {children}
    </div>
    <div className={cx(styles.border, over && styles.over)}>
      <div className={cx(styles.verticalBorder, title && styles[`verticalBorder_${title}`])} />
      <div className={cx(styles.horizontalBorder, title && styles[`horizontalBorder_${title}`])} />
      <Button
        {...props}
        title={title}
        className={cx(
          styles.title,
          styles.titleSettings,
          outside && styles.outside
        )} />
    </div>
  </div>
));
