import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';

import styles from './styles.css';

export default compose(
  withState('active', 'setActive', false),
  withState('color', 'setColor', props => props.value.color),
  withState('width', 'setWidth', props => props.value.width),
  withState('style', 'setStyle', props => props.value.style),
  withState('radius', 'setRadius', props => props.value.radius),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        color: color.hex
      });
    },
    onWidthChange: props => e => {
      e.stopPropagation();
      const value = e.target.value || 0;
      props.setWidth(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        width: value
      });
    },
    onStyleChange: props => e => {
      e.stopPropagation();
      const value = e.target.value || 0;
      props.setStyle(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        style: value
      });
    },
    onRadiusChange: props => e => {
      e.stopPropagation();
      const value = e.target.value || 0;
      props.setRadius(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        radius: value
      });
    }
  })
)(({
  label,
  color,
  active,
  onClick,
  onColorChange,
  onWidthChange,
  onStyleChange,
  onRadiusChange
}) => (
  <div className={styles.border}>
    <div className={styles.border__container}>
      {
        label &&
          <span
            className={styles.border__label}
            onClick={onClick}>
            {label}
          </span>
      }
    </div>
    {
      active &&
        <div className={styles.border__component}>
          <h2 className={styles.border__title}>Border options:</h2>
          <div className={styles.border__options}>
              {
                ['solid', 'dashed', 'dotted', 'none'].map((style) => (

                  <div
                    key={`borderStyle-${style}`}
                    className={cx(styles.border__inputBox, styles.border__inputBox_radio)}
                  >
                    <input
                      type='radio'
                      onChange={onStyleChange}
                      id={`borderId-${style}`}
                      value={style}
                      name='borderStyle'
                    />
                    <label htmlFor={`borderId-${style}`} className={cx(styles.border__labelOptions, styles[`border__labelOptions_${style}`])}>{style === 'none' ? 'none' : ''}</label>
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
              />
            </div>
            <div className={cx(styles.border__inputBox)}>
              <label htmlFor='borderId-radius'>Radius:</label>
              <input
                type='number'
                onChange={onRadiusChange}
                id='borderId-radius'
              />
            </div>
          </div>
          <ColorPicker
            color={color}
            onColorChange={onColorChange}
          />
        </div>
    }
  </div>
));
