import { PropTypes } from 'react';
import cx from 'classnames';
import { compose, withState, withHandlers, getContext } from 'recompose';

import styles from './styles.css';
import withEditorState from '../../helpers/editorState';
import Button from './button';

export default compose(
  withEditorState,
  getContext({
    editorDisabled: PropTypes.bool
  }),
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
  editorDisabled,
  ...props
}) => {
  if (editorDisabled) return <div>Trololo{children}</div>;
  return (
    <div
      className={styles.wrap}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}>
      <div>
        {
          preview && preview(<div>{children}</div>) || children}
      </div>
      {
        props.editingItem.canEdit &&
          <div className={cx(styles.border, over && styles.over)}>
            <div className={cx(styles.verticalBorder, title && styles[`verticalBorder_${title}`])} />
            <div className={cx(styles.horizontalBorder, title && styles[`horizontalBorder_${title}`])} />
            <Button
              {...props}
              title={title}
              className={cx(
                styles.title,
                styles.titleSettings,
                outside && styles.outside,
                props.editingItem.isContentEditing && styles.button_hidden,
              )} />
          </div>
      }
    </div>
  )
}
);
