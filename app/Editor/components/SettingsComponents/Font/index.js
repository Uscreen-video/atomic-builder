import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import Select from 'react-select';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';
import './react-select.css';

const weightTable = {
  300: 'thin',
  400: 'normal',
  700: 'bold'
};

const options = [
  { label: 'Open Sans', value: '"Open Sans", sans-serif' },
  { label: 'Roboto Condensed', value: '"Roboto Condensed", sans-serif' },
  { label: 'Arial, Helvetica', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { label: 'Palatino, Book Antiqua', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' }
];

export default compose(
  withState('family', 'setFamily', props => props.value.family),
  withState('size', 'setSize', props => props.value.size),
  withState('style', 'setStyle', props => props.value.style),
  withState('weight', 'setWeight', props => props.value.weight),
  withState('decoration', 'setDecoration', props => props.value.decoration),
  withState('transform', 'setTransform', props => props.value.transform),
  withHandlers({
    onFamilyChange: props => option => {
      props.setFamily(option.value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        family: option.value
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
    },
    onDecorationChange: props => e => {
      const value = e.target.value;
      props.setDecoration(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        decoration: value
      });
    },
    onTransformChange: props => e => {
      const value = e.target.value;
      props.setTransform(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        transform: value
      });
    },
    renderOption: props => option => (
      <span className='react-select__option' style={{ fontFamily: option.value }}>{option.label}</span>
    ),
    renderValue: props => (option) => (
      <strong style={{ color: option.color }}>{option.label}</strong>
    )
  })
)(({
  label,
  size,
  weight,
  family,
  style,
  decoration,
  transform,
  onSizeChange,
  onWeightChange,
  onFamilyChange,
  onStyleChange,
  onDecorationChange,
  onTransformChange,
  renderOption,
  renderValue
}) => (
  <SettingsTitle label={label}>
    <div className={styles.font__controls}>
      <div className={styles.font__inputBox}>
        <label
          htmlFor='familyId'
          className={styles.font__label}>
          Font family
        </label>
        <Select
          placeholder='Please select a font family'
          options={options}
          optionRenderer={renderOption}
          onChange={onFamilyChange}
          value={family}
          valueRenderer={renderValue}
          clearable={false}
        />
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
    <h2 className={styles.font__title}>Text decoration:</h2>
    <div className={styles.font__controls}>
        {
          ['line-through', 'underline', 'none'].map((decorationValue) => (
            <div
              key={`decoration-${decorationValue}`}
              className={cx(styles.font__inputBox, styles.font__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onDecorationChange}
                id={`styleId-${decorationValue}`}
                value={decorationValue}
                name='fontDecoration'
                checked={decoration === decorationValue}
              />
              <label
                htmlFor={`decorationId-${decorationValue}`}
                className={cx(styles.font__labelOptions)}
                style={{ textDecoration: decorationValue }}>
                  {decorationValue}
              </label>
            </div>
          ))
        }
    </div>
    <h2 className={styles.font__title}>Text case:</h2>
    <div className={styles.font__controls}>
        {
          ['lowercase', 'uppercase', 'none'].map((caseValue) => (
            <div
              key={`style-${caseValue}`}
              className={cx(styles.font__inputBox, styles.font__inputBox_radio)}
            >
              <input
                type='radio'
                onChange={onTransformChange}
                id={`caseId-${caseValue}`}
                value={caseValue}
                name='fontCase'
                checked={transform === caseValue}
              />
              <label
                htmlFor={`caseId-${caseValue}`}
                className={cx(styles.font__labelOptions)}
                style={{ textTransform: caseValue }}>
                  {caseValue}
              </label>
            </div>
          ))
        }
    </div>
  </SettingsTitle>
));
