import { compose, withState, withHandlers } from 'recompose';

import cx from 'classnames';

import Dropzone from 'react-dropzone';

import editorState from 'Editor/helpers/editorState';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';

import styles from './styles.css';

export default compose(
  editorState,
  withState('active', 'setActive', false),
  withState('image', 'setImage', ''),
  withState('cover', 'setCover', false),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onCoverChange: props => e => {
      e.stopPropagation();
      const status = !props.cover;
      props.setCover(status);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, [props.image, !props.cover ? 'cover' : 'auto']);
    },
    onDrop: props => async files => {
      const images = await imagesToBase64(files);
      props.setImage(images[0]);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, [images[0], props.cover ? 'cover' : 'auto']);
    }
  })
)(({
  label,
  image,
  active,
  onClick,
  onDrop,
  onCoverChange
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
              <span className={styles.fileUploader__dropzoneMessage}>
                Try dropping some files here, or click to select files to upload.
              </span>
            </Dropzone>
            {
              image &&
                <div className={styles.fileUploader__previewContainer}>
                  <figure>
                    <figcaption className={styles.fileUploader__optionsLabel}>Image preview:</figcaption>
                    <img className={styles.fileUploader__preview} src={image} alt='' />
                  </figure>
                  <div className={styles.fileUploader__backgroundOptions}>
                    <h2 className={styles.fileUploader__optionsLabel}>Background options:</h2>
                    <div className={styles.fileUploader__inputBox}>
                      <input type='checkbox' onChange={onCoverChange} />
                      <label>Stretch background</label>
                    </div>
                  </div>
                </div>
            }
          </div>
      }
    </div>
  </div>
));
