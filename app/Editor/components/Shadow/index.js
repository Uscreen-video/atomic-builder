import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';

import styles from './styles.css';

export default compose(
  withState('active', 'setActive', false),
  withState('color', 'setColor', props => props.boxShadow.color),
  withState('position', 'setPosition', props => ({ x: props.boxShadow.x, y: props.boxShadow.y })),
  withState('blur', 'setBlur', props => props.boxShadow.blur),
  withState('spread', 'setSpread', props => props.boxShadow.spread),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.boxShadow,
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
        ...props.boxShadow,
        x: position.x,
        y: position.y
      });
    },
    onBlurChange: props => e => {
      e.stopPropagation();
      const value = e.target.value || 0;
      props.setBlur(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.boxShadow,
        blur: value
      });
    },
    onSpreadChange: props => e => {
      e.stopPropagation();
      const value = e.target.value || 0;
      props.setSpread(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.boxShadow,
        spread: value
      });
    }
  })
)(({
  label,
  color,
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
                  ['x', 'y'].map((position) => (

                    <div
                      key={`shadowPosition-${position}`}
                      className={cx(styles.shadow__inputBox)}
                    >
                      <label htmlFor={`shadowId-${position}`}>{position === 'x' ? 'Offset-x:' : 'Offset-y:'}</label>
                      <input
                        type='number'
                        onChange={onPositionChange}
                        id={`shadowId-${position}`}
                        data-type={position}
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
                      />
                    </div>
                    <div className={cx(styles.shadow__inputBox)}>
                      <label htmlFor='shadowId-spread'>Spread:</label>
                      <input
                        type='number'
                        onChange={onSpreadChange}
                        id='shadowId-spread'
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
