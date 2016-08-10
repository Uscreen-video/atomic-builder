import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';

import editorState from 'Editor/helpers/editorState';
import styles from './styles.css';

export default compose(
  editorState,
  withState('active', 'setActive', false),
  withState('spacing', 'setSpacing', {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onSpacingChange: props => e => {
      const key = e.target.dataset.type;
      const value = e.target.value || 0;
      const spacing = {
        ...props.spacing,
        [key]: `${value}px`
      };
      console.log(spacing);
      props.setSpacing(spacing);
      props.setSettings && props.setSettings('padding', `${spacing.top} ${spacing.right} ${spacing.bottom} ${spacing.left}`);
    }
  })
)(({
  label,
  spacing,
  active,
  onClick,
  onSpacingChange
}) => (
  <div className={styles.boxSpacing}>
    <div className={styles.boxSpacing__container}>
      {
        label &&
          <span
            className={styles.boxSpacing__label}
            onClick={onClick}>
            {label}
          </span>
      }
      {
        active &&
          <div className={styles.boxSpacing__component}>
            <div className={styles.boxSpacing__box}>
              <div className={styles.boxSpacing__content}>
                <div className={cx(
                    styles.boxSpacing__inputbox,
                    styles.boxSpacing__inputbox_top,
                )}>
                  <label>Top:</label>
                  <input
                    type='text'
                    data-type='top'
                    onChange={onSpacingChange}
                    className={cx(
                      styles.boxSpacing__input
                    )} />
                </div>
                <div className={cx(
                    styles.boxSpacing__inputbox,
                    styles.boxSpacing__inputbox_right,
                )}>
                  <label>Right:</label>
                  <input
                    type='text'
                    data-type='right'
                    onChange={onSpacingChange}
                    className={cx(
                      styles.boxSpacing__input
                  )} />
                </div>
                <div className={cx(
                    styles.boxSpacing__inputbox,
                    styles.boxSpacing__inputbox_bottom,
                )}>
                  <label>Bottom:</label>
                  <input
                    type='text'
                    data-type='bottom'
                    onChange={onSpacingChange}
                    className={cx(
                      styles.boxSpacing__input
                    )} />
                </div>
                <div className={cx(
                    styles.boxSpacing__inputbox,
                    styles.boxSpacing__inputbox_left,
                )}>
                  <label>Left:</label>
                  <input
                    type='text'
                    data-type='left'
                    onChange={onSpacingChange}
                    className={cx(
                      styles.boxSpacing__input
                    )} />
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  </div>
));
