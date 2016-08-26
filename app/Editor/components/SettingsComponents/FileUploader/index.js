import { compose, withState, withHandlers } from 'recompose';

import cx from 'classnames';
import Dropzone from 'react-dropzone';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';
import SettingsTitle from '../SettingsTitle';

import styles from './styles.css';

export default compose(
  withState('image', 'setImage', props => props.value.url || ''),
  withState('cover', 'setCover', props => props.value.size || 'auto'),
  withState('position', 'setPostion', props => ({ x: props.value.x, y: props.value.y })),
  withState('repeat', 'setRepeat', props => props.value.repeat || 'no-repeat'),
  withHandlers({
    onCoverChange: props => e => {
      e.stopPropagation();
      const status = !props.cover;
      props.setCover(status);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        size: !status ? 'cover' : 'auto',
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
      props.setPostion({
        ...props.position,
        [key]: value
      });
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        [key]: value
      });
    },
    onDrop: props => async files => {
      const images = await imagesToBase64(files);
      props.setImage(images[0]);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value, 
        url: images[0]
      });
    }
  })
)(({
  label,
  image,
  repeat,
  onDrop,
  onCoverChange,
  onRepeatChange,
  onPositionChange
}) => (
  <SettingsTitle label={label}>
    <Dropzone onDrop={onDrop} className={styles.fileUploader__dropzone}>
      <div className={styles.fileUploader__previewContainer}>
        {
          image && <img className={styles.fileUploader__preview} src={image} alt='' />
        }
        <span className={cx(
          styles.fileUploader__dropzoneMessage,
          image && styles.fileUploader__dropzoneMessage_white,
        )}>
            Try dropping some files here, or click to select files to upload.
        </span>
      </div>
    </Dropzone>
    {
      image &&
        <div className={styles.fileUploader__backgroundOptions}>
          <div className={styles.fileUploader__backgroundOptions__column}>
            <p className={styles.fileUploader__title}>Background options:</p>
            <div
              className={cx(
                styles.fileUploader__inputBox,
                styles.fileUploader__inputBox_cover
              )}
              id='optionCover'
            >
              <input type='checkbox' onChange={onCoverChange} />
              <label htmlFor='optionCover'>Stretch background</label>
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
                ['x', 'y'].map((position) => (

                  <div
                    key={`bgrPosition-${position}`}
                    className={cx(styles.fileUploader__inputBox, styles.fileUploader__inputBox_stack)}
                  >
                    <label htmlFor={`id-${position}`}>{position === 'x' ? 'Left:' : 'Top:'}</label>
                    <input
                      type='number'
                      onChange={onPositionChange}
                      id={`id-${position}`}
                      data-type={position}
                    />
                  </div>
                ))
              }
            </div>

          </div>
        </div>
    }
  </SettingsTitle>
));
