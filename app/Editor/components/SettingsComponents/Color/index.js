import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('background', 'setBackground', props => props.value.background),
  withState('color', 'setColor', props => props.value.color || '#333'),
  withState('colorType', 'setColorType', 'background'),
  withHandlers({
    onColorChange: props => color => {
      if (props.colorType === 'background') {
        props.setBackground(color.hex);
      } else {
        props.setColor(color.hex);
      }
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        [props.colorType]: color.hex
      });
    },
    onRadioChange: props => e => {
      const value = e.target.value;
      props.setColorType(value);
    }
  })
)(({
  label,
  color,
  background,
  colorType,
  onColorChange,
  onRadioChange
}) => (
  <SettingsTitle label={label} color={colorType === 'background' ? background : color}>
    <div className={styles.color__options}>
        {
          ['background', 'color'].map((colorValue) => (

            <div
              key={`color-${colorValue}`}
              className={cx(styles.color__inputBox, styles.color__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onRadioChange}
                id={`colorId-${colorValue}`}
                value={colorValue}
                name='colorType'
                checked={colorType === colorValue}
              />
              <label htmlFor={`colorId-${colorValue}`} className={cx(styles.color__labelOptions)}>{colorValue}</label>
            </div>
          ))
        }
    </div>
    <ColorPicker
      color={colorType === 'background' ? background : color}
      onColorChange={onColorChange}
      transparent
    />
  </SettingsTitle>
));
