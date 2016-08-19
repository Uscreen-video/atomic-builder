import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';

import editorState from 'Editor/helpers/editorState';
import styles from './styles.css';

export default compose(
  editorState,
  withState('active', 'setActive', false),
  withState('spacing', 'setSpacing', props => props.value || {
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
      props.setSpacing(spacing);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, `${spacing.top} ${spacing.right} ${spacing.bottom} ${spacing.left}`);
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
                {
                  ['top', 'right', 'bottom', 'left'].map((position) => (
                    <div
                      key={`padding-${position}`}
                      className={cx(
                        styles.boxSpacing__inputbox,
                        styles[`boxSpacing__inputbox_${position}`]
                    )}>
                      <label htmlFor={`id-${position}`}>{position} (px):</label>
                      <input
                        type='text'
                        data-type={position}
                        onChange={onSpacingChange}
                        id={`id-${position}`}
                        className={cx(
                          styles.boxSpacing__input
                        )} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      }
    </div>
  </div>
));
