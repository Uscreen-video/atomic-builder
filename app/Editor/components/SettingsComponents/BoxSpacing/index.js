import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';

import SettingsTitle from '../SettingsTitle';
import styles from './styles.css';

export default compose(
  withState('spacing', 'setSpacing', props => props.value || {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }),
  withHandlers({
    onSpacingChange: props => e => {
      const key = e.target.dataset.type;
      const value = e.target.value;
      const spacing = {
        ...props.spacing,
        [key]: value
      };
      props.setSpacing(spacing);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, spacing);
    }
  })
)(({
  label,
  spacing,
  onSpacingChange
}) => (
  <SettingsTitle label={label}>
    <div className={styles.boxSpacing__box}>
      <div className={styles.boxSpacing__content}>
        {
          ['top', 'right', 'bottom', 'left'].map((position) => (
            <div
              key={`padding-${position}`}
              className={cx(
                styles.boxSpacing__inputbox,
                styles[`boxSpacing__inputbox_${position}`]
            )}>
              <label htmlFor={`id-${position}`}>{position} (px):</label>
              <input
                type='number'
                data-type={position}
                onChange={onSpacingChange}
                id={`id-${position}`}
                value={spacing[position]}
                className={cx(
                  styles.boxSpacing__input
                )} />
            </div>
          ))
        }
      </div>
    </div>
  </SettingsTitle>
));
