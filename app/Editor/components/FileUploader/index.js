import { compose, withState, withHandlers } from 'recompose';

import cx from 'classnames';
import Dropzone from 'react-dropzone';

import editorState from 'Editor/helpers/editorState';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';

import styles from './styles.css';

export default compose(
  editorState,
  withState('active', 'setActive', false),
  withState('image', 'setImage', props => props.editingItem.mapper.backgroundImage.value[0]) || '',
  withState('cover', 'setCover', props => props.editingItem.mapper.backgroundImage.value[1]) || 'auto',
  withState('position', 'setPostion', props => props.editingItem.mapper.backgroundImage.value[2]) || { x: 0, y: 0 },
  withState('repeat', 'setRepeat', props => props.editingItem.mapper.backgroundImage.value[3]) || 'no-repeat',
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onCoverChange: props => e => {
      e.stopPropagation();
      const status = !props.cover;
      props.setCover(status);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, [
        props.image,
        !status ? 'cover' : 'auto',
        props.position,
        props.repeat
      ]);
    },
    onRepeatChange: props => e => {
      e.stopPropagation();
      const repeatValue = e.target.value;
      props.setRepeat(repeatValue);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, [
        props.image,
        !props.cover ? 'cover' : 'auto',
        props.position,
        repeatValue
      ]);
    },
    onPositionChange: props => e => {
      e.stopPropagation();
      const key = e.target.dataset.type;
      const value = e.target.value || 0;
      const position = {
        ...props.position,
        [key]: `${value}px`
      };
      props.setPostion(position);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, [
        props.image,
        !props.cover ? 'cover' : 'auto',
        position,
        props.repeat
      ]);
    },
    onDrop: props => async files => {
      const images = await imagesToBase64(files);
      props.setImage(images[0]);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, [
        images[0],
        !props.cover ? 'cover' : 'auto',
        props.position,
        props.repeat
      ]);
    }
  })
)(({
  label,
  image,
  active,
  repeat,
  onClick,
  onDrop,
  onCoverChange,
  onRepeatChange,
  onPositionChange
}) => (
  <div className={styles.fileUploader}>
    <div className={styles.fileUploader__container}>
      {
        label &&
          <span
            className={styles.fileUploader__label}
            onClick={onClick}>
            {label}
          </span>
      }
      {
        active &&
          <div className={styles.fileUploader__component}>
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

                          <div className={styles.fileUploader__inputBox}>
                            <input
                              type='radio'
                              onChange={onRepeatChange}
                              name='bgr-repeat'
                              value={repeatMode}
                              key={repeatMode}
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

                          <div className={cx(styles.fileUploader__inputBox, styles.fileUploader__inputBox_stack)}>
                            <label htmlFor={`id-${position}`}>{position === 'x' ? 'Left:' : 'Top:'}</label>
                            <input
                              type='text'
                              onChange={onPositionChange}
                              key={position}
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
          </div>
      }
    </div>
  </div>
));
