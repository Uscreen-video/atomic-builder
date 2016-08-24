import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

const weightTable = {
  300: 'thin',
  400: 'normal',
  700: 'bold'
};

export default compose(
  withState('family', 'setFamily', props => props.value.family),
  withState('size', 'setSize', props => props.value.size),
  withState('style', 'setStyle', props => props.value.style),
  withState('weight', 'setWeight', props => props.value.weight),
  withHandlers({
    onFamilyChange: props => e => {
      const value = e.target.value;
      props.setFamily(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        family: value
      });
    },
    onSizeChange: props => e => {
      const value = e.target.value;
      props.setSize(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        size: value
      });
    },
    onStyleChange: props => e => {
      const value = e.target.value;
      props.setStyle(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        style: value
      });
    },
    onWeightChange: props => e => {
      const value = e.target.value;
      props.setWeight(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        weight: value
      });
    }
  })
)(({
  label,
  size,
  weight,
  family,
  style,
  onSizeChange,
  onWeightChange,
  onFamilyChange,
  onStyleChange
}) => (
  <SettingsTitle label={label}>
    <div className={styles.font__controls}>
      <div className={styles.font__inputBox}>
        <label
          htmlFor='familyId'
          className={styles.font__label}>
          Font family
        </label>
        <input
          type='text'
          onChange={onFamilyChange}
          id='familyId'
          value={family}
          placeholder='Please enter a font family'
          className={cx(
            styles.font__input
          )}
          list='familyList' />
        <datalist id='familyList'>
          <option>Arial</option>
          <option>Verdana</option>
          <option>Open Sans</option>
          <option>Georgia</option>
          <option>Times New Roman</option>
        </datalist>
      </div>
      <div
        className={cx(
          styles.font__inputBox,
          styles.font__inputBox_size
        )}>
        <label
          htmlFor='sizeId'
          className={styles.font__label}>
          Size (px):
        </label>
        <input
          type='number'
          onChange={onSizeChange}
          id='sizeId'
          value={size}
          className={cx(
            styles.font__input
          )} />
      </div>
    </div>
    <h2 className={styles.font__title}>Font styles:</h2>
    <div className={styles.font__controls}>
        {
          ['normal', 'italic'].map((styleValue) => (

            <div
              key={`style-${styleValue}`}
              className={cx(styles.font__inputBox, styles.font__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onStyleChange}
                id={`styleId-${styleValue}`}
                value={styleValue}
                name='fontStyle'
                checked={style === styleValue}
              />
              <label
                htmlFor={`styleId-${styleValue}`}
                className={cx(styles.font__labelOptions)}
                style={{ fontStyle: styleValue }}>
                  {styleValue}
              </label>
            </div>
          ))
        }
    </div>
    <h2 className={styles.font__title}>Font weight:</h2>
    <div className={styles.font__controls}>
        {
          ['300', '400', '700'].map((weightValue) => (

            <div
              key={`weight-${weightValue}`}
              className={cx(styles.font__inputBox, styles.font__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onWeightChange}
                id={`weightId-${weightValue}`}
                value={weightValue}
                name='fontWeight'
                checked={weight === weightValue}
              />
              <label
                htmlFor={`weihgtId-${weightValue}`}
                className={cx(styles.font__labelOptions)}
                style={{ fontWeight: weightValue }}>
                  {weightTable[weightValue]}
              </label>
            </div>
          ))
        }
    </div>
  </SettingsTitle>
));
