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
    onSpacingChange: props => spacing => {
      props.setSpacing(spacing);
      // props.setSettings && props.setSettings(color.hex);
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
                <input
                  type='text'
                  className={cx(
                    styles.boxSpacing__input,
                    styles.boxSpacing__input_top
                  )} />
                <input
                  type='text'
                  className={cx(
                    styles.boxSpacing__input,
                    styles.boxSpacing__input_right
                  )} />
                <input
                  type='text'
                  className={cx(
                    styles.boxSpacing__input,
                    styles.boxSpacing__input_bottom
                  )} />
                <input
                  type='text'
                  className={cx(
                    styles.boxSpacing__input,
                    styles.boxSpacing__input_left
                  )} />
              </div>
            </div>
          </div>
      }
    </div>
  </div>
));
