import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('color', 'setColor', props => props.value.color),
  withState('position', 'setPosition', props => ({ x: props.value.x, y: props.value.y })),
  withState('blur', 'setBlur', props => props.value.blur),
  withHandlers({
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        color: color.hex
      });
    },
    onPositionChange: props => e => {
      e.stopPropagation();
      const key = e.target.dataset.type;
      const value = e.target.value;
      const position = {
        ...props.position,
        [key]: value
      };
      props.setPosition(position);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        x: position.x,
        y: position.y
      });
    },
    onBlurChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setBlur(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        blur: value
      });
    },
    onSpreadChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setSpread(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        spread: value
      });
    }
  })
)(({
  label,
  color,
  position,
  blur,
  spread,
  onColorChange,
  onPositionChange,
  onBlurChange,
  onSpreadChange
}) => (
  <SettingsTitle label={label}>
    <h2 className={styles.shadow__title}>Shadow options:</h2>
    <div className={styles.shadow__options}>
        {
          ['x', 'y'].map((positionKey) => (

            <div
              key={`shadowPosition-${positionKey}`}
              className={cx(styles.shadow__inputBox)}
            >
              <label htmlFor={`shadowId-${position}`}>{positionKey === 'x' ? 'Offset-x:' : 'Offset-y:'}</label>
              <input
                type='number'
                onChange={onPositionChange}
                id={`shadowId-${positionKey}`}
                data-type={positionKey}
                value={position[positionKey]}
              />
            </div>
          ))
        }
            <div className={cx(styles.shadow__inputBox)}>
              <label htmlFor='shadowId-blur'>Blur:</label>
              <input
                type='number'
                onChange={onBlurChange}
                id='shadowId-blur'
                value={blur}
              />
            </div>
            <div className={cx(styles.shadow__inputBox)}>
              <label htmlFor='shadowId-spread'>Spread:</label>
              <input
                type='number'
                onChange={onSpreadChange}
                id='shadowId-spread'
                value={spread}
              />
            </div>
    </div>
    <ColorPicker
      color={color}
      onColorChange={onColorChange}
    />
  </SettingsTitle>
));
