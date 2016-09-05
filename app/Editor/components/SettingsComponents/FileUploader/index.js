import { compose, withState, withHandlers } from 'recompose';

import cx from 'classnames';

import Icon from 'Editor/components/Icon';
import Dropzone from 'react-dropzone';
import ColorPicker from '../ColorPicker';
import { uploadToAmazon } from 'Editor/helpers/fileProcessing';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('image', 'setImage', props => props.value.url || ''),
  withState('size', 'setSize', props => props.value.size || 'auto'),
  withState('position', 'setPosition', props => ({ x: props.value.x, y: props.value.y })),
  withState('repeat', 'setRepeat', props => props.value.repeat || 'no-repeat'),
  withState('color', 'setColor', props => props.value.color),
  withHandlers({
    onSizeChange: props => e => {
      e.stopPropagation();
      const size = e.target.checked ? 'cover' : 'auto';
      props.setSize(size);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        size
      });
    },
    onRepeatChange: props => e => {
      e.stopPropagation();
      const repeatValue = e.target.value;
      props.setRepeat(repeatValue);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        repeat: repeatValue
      });
    },
    onPositionChange: props => e => {
      e.stopPropagation();
      const key = e.target.dataset.type;
      const value = e.target.value || 0;
      props.setPosition({
        ...props.position,
        [key]: value
      });
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        [key]: value
      });
    },
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        color: color.hex
      });
    },
    onDrop: props => async files => {
      const images = await uploadToAmazon(files);
      props.setImage(images[0]);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        url: images[0]
      });
    },
    onResetClick: props => (e) => {
      e.stopPropagation();
      props.setImage('');
      props.setPosition({ x: 0, y: 0 });
      props.setSize('auto');
      props.setRepeat('no-repeat');
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        url: '',
        x: 0,
        y: 0,
        repeat: 'no-repeat',
        size: 'auto',
        color: props.value.color || 'transparent'
      });
    }
  })
)(({
  label,
  image,
  size,
  position,
  repeat,
  color,
  onDrop,
  onSizeChange,
  onRepeatChange,
  onPositionChange,
  onResetClick,
  onColorChange
}) => (
  <SettingsTitle label={label}>
    !props.value.active &&
    <div>
      <div className={styles.fileUploader__dropzoneContainer}>
        <Dropzone onDrop={onDrop} className={styles.fileUploader__dropzone}>
          <div className={styles.fileUploader__previewContainer}>
            {
              image && <img className={styles.fileUploader__preview} src={image} alt='' />
            }
            <span
              className={cx(
              styles.fileUploader__dropzoneMessage,
              image && styles.fileUploader__dropzoneMessage_white,
            )}>
                Try dropping some files here, or click to select files to upload.
            </span>
            {
              image &&
              <div className={styles.fileUploader__resetButton} onClick={onResetClick}>
                <Icon value='cross' />
              </div>
            }
          </div>
        </Dropzone>
      </div>
      {
        image &&
          <div className={styles.fileUploader__backgroundOptions}>
            <div className={styles.fileUploader__backgroundOptions__column}>
              <p className={styles.fileUploader__title}>Background options:</p>
              <div
                className={cx(
                  styles.fileUploader__inputBox,
                  styles.fileUploader__inputBox_size
                )}
                id='optionSize'
              >
                <input
                  type='checkbox'
                  onChange={onSizeChange}
                  checked={size === 'cover'}
                  />
                <label htmlFor='optionSize'>Stretch background</label>
              </div>

              <div className={styles.fileUploader__repeatingBox}>
                <p className={styles.fileUploader__title}>Background repeating:</p>
                {
                  ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'].map((repeatMode) => (

                    <div
                      key={`repeat-${repeatMode}`}
                      className={styles.fileUploader__inputBox}
                    >
                      <input
                        type='radio'
                        onChange={onRepeatChange}
                        name='bgr-repeat'
                        value={repeatMode}
                        id={`id-${repeatMode}`}
                        checked={repeatMode === repeat}
                      />
                      <label htmlFor={`id-${repeatMode}`}>{repeatMode}</label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={styles.fileUploader__backgroundOptions__column}>
              <p className={styles.fileUploader__title}>Background position:</p>
              <div className={styles.fileUploader__positionBox}>
                {
                  ['x', 'y'].map((positionValue) => (

                    <div
                      key={`bgrPosition-${positionValue}`}
                      className={cx(
                        styles.fileUploader__inputBox,
                        styles.fileUploader__inputBox_stack
                      )}>
                      <label htmlFor={`id-${positionValue}`}>
                        {positionValue === 'x' ? 'Left (px):' : 'Top (px):'}
                      </label>
                      <input
                        type='number'
                        onChange={onPositionChange}
                        id={`id-${positionValue}`}
                        data-type={positionValue}
                        value={position[positionValue]}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      }
    </div>
    <p className={styles.fileUploader__title}>Background color:</p>
    <ColorPicker
      color={color}
      onColorChange={onColorChange}
    />
  </SettingsTitle>
));
