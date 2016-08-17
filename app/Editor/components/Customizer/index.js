import cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';

import styles from './styles.css';
import withEditorState from '../../helpers/editorState';
import Button from './button';

export default compose(
  withEditorState,
  withState('over', 'setOver', false),
  withHandlers({
    mouseOver: props => e => {
      e.stopPropagation();
      if (props.editingItem.isContentEditing) return false;
      return props.setOver(true);
    },
    mouseOut: props => e => {
      e.stopPropagation();
      props.setOver(false);
    }
  })
)(({
  outside,
  children,
  preview,
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
      {preview && preview(<div>{children}</div>) || children}
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
