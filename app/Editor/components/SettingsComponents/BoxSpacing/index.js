import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';

import SettingsTitle from '../SettingsTitle';
import styles from './styles.css';

export default compose(
  withState('spacingType', 'setSpacingType', 'padding'),
  withState('padding', 'setPadding', props => props.value.padding),
  withState('margin', 'setMargin', props => props.value.margin),
  withHandlers({
    onSpacingChange: props => e => {

      const key = e.target.dataset.type;
      const value = e.target.value | 0;
      const spacing = {
        ...props.value[props.spacingType],
        [key]: value
      };

      if (props.spacingType === 'padding') {
        props.setPadding(spacing);
      } else {
        props.setMargin(spacing);
      }

      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        [props.spacingType]: spacing
      });
    },
    onRadioChange: props => e => {
      const value = e.target.value;
      props.setSpacingType(value);
    }
  })
)(({
  label,
  padding,
  margin,
  spacingType,
  onRadioChange,
  onSpacingChange
}) => (
  <SettingsTitle label={label}>
    <div className={styles.boxSpacing__options}>
        {
          ['margin', 'padding'].map((spacingValue) => (
            <div
              key={`spacing-${spacingValue}`}
              className={cx(styles.boxSpacing__inputBox, styles.boxSpacing__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onRadioChange}
                id={`spacingId-${spacingValue}`}
                value={spacingValue}
                name='spacingType'
                checked={spacingType === spacingValue}
              />
              <label htmlFor={`spacingId-${spacingValue}`} className={cx(styles.boxSpacing__labelOptions)}>{spacingValue}</label>
            </div>
          ))
        }
    </div>
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
              <label htmlFor={`id-${position}`}>{position}:</label>
              <input
                type='number'
                data-type={position}
                onChange={onSpacingChange}
                id={`id-${position}`}
                value={spacingType === 'padding' ? padding[position] : margin[position]}
                className={cx(
                  styles.boxSpacing__input
                )} />
              <span className={cx(styles.boxSpacing__inputTip)}>px</span>
            </div>
          ))
        }
      </div>
    </div>
  </SettingsTitle>
));
