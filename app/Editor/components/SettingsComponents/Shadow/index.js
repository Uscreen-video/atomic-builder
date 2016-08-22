import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';

import styles from './styles.css';

export default compose(
  withState('active', 'setActive', false),
  withState('color', 'setColor', props => props.value.color),
  withState('position', 'setPosition', props => ({ x: props.value.x, y: props.value.y })),
  withState('blur', 'setBlur', props => props.value.blur),
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
    onPositionChange: props => e => {
      e.stopPropagation();
      const key = e.target.dataset.type;
      const value = e.target.value || 0;
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
      const value = e.target.value || 0;
      props.setBlur(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        blur: value
      });
    },
    onSpreadChange: props => e => {
      e.stopPropagation();
      const value = e.target.value || 0;
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
  active,
  onClick,
  onColorChange,
  onPositionChange,
  onBlurChange,
  onSpreadChange
}) => (
  <div className={styles.shadow}>
    <div className={styles.shadow__container}>
      {
        label &&
          <span
            className={styles.shadow__label}
            onClick={onClick}>
            {label}
          </span>
      }
    </div>
    {
      active &&
        <div className={styles.shadow__component}>
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
        </div>
    }
  </div>
));
