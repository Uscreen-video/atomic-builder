import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('color', 'setColor', props => props.value),
  withHandlers({
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, color.hex);
    }
  })
)(({
  label,
  color,
  onColorChange
}) => (
  <SettingsTitle label={label} color={color}>
    <ColorPicker
      color={color}
      onColorChange={onColorChange}
      transparent
    />
  </SettingsTitle>
));
