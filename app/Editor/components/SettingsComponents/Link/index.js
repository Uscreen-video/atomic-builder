import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('url', 'setUrl', props => props.value.url),
  withState('target', 'setTarget', props => props.value.target),
  withHandlers({
    onInputChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setUrl(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        url: value
      });
    },
    onRadioChange: props => e => {
      e.stopPropagation();
      const value = e.target.value;
      props.setTarget(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        target: value
      });
    }
  })
)(({
  label,
  url,
  target,
  onInputChange,
  onRadioChange
}) => (
  <SettingsTitle label={label}>
    <div
      className={cx(
        styles.link__inputBox
    )}>
      <label
        htmlFor='urlId'
        className={styles.link__label}>
        What url do you want to link to?
      </label>
      <input
        type='text'
        onChange={onInputChange}
        id='urlId'
        value={url}
        placeholder='Please enter a link'
        className={cx(
          styles.link__input
        )} />
    </div>
    <div className={styles.link__radioContainer}>
        {
          ['_self', '_blank'].map((targetValue) => (

            <div
              key={`target-${targetValue}`}
              className={cx(styles.link__inputBox, styles.link__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onRadioChange}
                id={`targetId-${targetValue}`}
                value={targetValue}
                name='linkTarget'
                checked={target === targetValue}
              />
              <label
                htmlFor={`targetId-${targetValue}`}
                className={cx(styles.link__labelOptions)}>
                  {targetValue === '_self' ? 'Same window' : 'New window'}
              </label>
            </div>
          ))
        }
    </div>
  </SettingsTitle>
));
