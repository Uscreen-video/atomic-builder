import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';

import editorState from 'Editor/helpers/editorState';
import { ChromePicker, SliderPicker } from 'react-color';

import styles from './styles.css';

export default compose(
  editorState,
  withState('active', 'setActive', false),
  withState('color', 'setColor', props => props.color),
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
          <SliderPicker
            color={color}
            onChangeComplete={onColorChange}
          />
        </div>
    }
  </div>
));
