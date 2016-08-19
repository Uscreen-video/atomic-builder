import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';

import styles from './styles.css';

export default compose(
  withState('active', 'setActive', false),
  withState('color', 'setColor', props => props.value),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, color.hex);
    }
  })
)(({
  label,
  color,
  active,
  onClick,
  onColorChange
}) => (
  <div className={styles.colorpicker}>
    <div className={styles.colorpicker__container}>
      {
        label &&
          <span
            className={styles.colorpicker__label}
            onClick={onClick}>
            {label}
          </span>
      }
      <div
        className={cx(styles.colorpicker__button)}
        onClick={onClick}>
        <div
          className={styles.colorpicker__placeholder}
          style={{ backgroundColor: color }} />
      </div>
    </div>
    {
      active &&
        <div className={styles.colorpicker__component}>
          <ColorPicker
            color={color}
            onColorChange={onColorChange}
            transparent
          />
        </div>
    }
  </div>
));
