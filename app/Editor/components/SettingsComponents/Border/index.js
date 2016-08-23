import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('color', 'setColor', props => props.value.color),
  withState('width', 'setWidth', props => props.value.width),
  withState('style', 'setStyle', props => props.value.style),
  withState('radius', 'setRadius', props => props.value.radius),
  withHandlers({
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        color: color.hex
      });
    },
    onWidthChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setWidth(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        width: value
      });
    },
    onStyleChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setStyle(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        style: value
      });
    },
    onRadiusChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setRadius(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        radius: value
      });
    }
  })
)(({
  color,
  label,
  width,
  style,
  radius,
  onColorChange,
  onWidthChange,
  onStyleChange,
  onRadiusChange
}) => (
  <SettingsTitle label={label}>
    <h2 className={styles.border__title}>Border options:</h2>
    <div className={styles.border__options}>
        {
          ['solid', 'dashed', 'dotted', 'none'].map((styleValue) => (

            <div
              key={`borderStyle-${styleValue}`}
              className={cx(styles.border__inputBox, styles.border__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onStyleChange}
                id={`borderId-${styleValue}`}
                value={styleValue}
                name='borderStyle'
                checked={style === styleValue}
              />
              <label htmlFor={`borderId-${styleValue}`} className={cx(styles.border__labelOptions, styles[`border__labelOptions_${styleValue}`])}>{styleValue === 'none' ? 'none' : ''}</label>
            </div>
          ))
        }
    </div>
    <div className={styles.border__options}>
      <div className={cx(styles.border__inputBox)}>
        <label htmlFor='borderId-width'>Width:</label>
        <input
          type='number'
          onChange={onWidthChange}
          id='borderId-width'
          value={width}
        />
      </div>
      <div className={cx(styles.border__inputBox)}>
        <label htmlFor='borderId-radius'>Radius:</label>
        <input
          type='number'
          onChange={onRadiusChange}
          id='borderId-radius'
          value={radius}
        />
      </div>
    </div>
    <ColorPicker
      color={color}
      onColorChange={onColorChange}
    />
  </SettingsTitle>
));
