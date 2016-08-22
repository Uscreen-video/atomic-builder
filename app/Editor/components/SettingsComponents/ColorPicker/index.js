import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import { SketchPicker } from 'react-color';

import styles from './styles.css';

export default compose(
  withState('active', 'setActive', true),
  withState('color', 'setColor', props => props.color),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
      props.transparent && props.active && props.onColorChange('transparent');
    },
    onColorChange: props => color => {
      props.setColor(color);
      props.onColorChange(color);
    }
  })
)(({
  active,
  onClick,
  color,
  transparent,
  onColorChange
}) => (
  <div className={styles.colorpicker}>
    {
      transparent &&
        <div className={cx(styles.colorpicker__inputBox)}>
        <input
          type='checkbox'
          onChange={onClick}
          id='colorId-checkbox'
        />
        <label className={styles.colorpicker__label} htmlFor='colorId-checkbox'>
          Use a transparent color:
        </label>
      </div>
    }
    {
      active &&
        <div className={styles.colorpicker__component}>
          <SketchPicker
            color={color}
            onChangeComplete={onColorChange}
          />
        </div>
    }
  </div>
));
