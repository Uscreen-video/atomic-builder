import { compose, withState, withHandlers } from 'recompose';

import cx from 'classnames';

import Dropzone from 'react-dropzone';

import editorState from 'Editor/helpers/editorState';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';

import styles from './styles.css';

export default compose(
  editorState,
  withState('active', 'setActive', false),
  withState('url', 'setUrl', ''),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    },
    onDrop: props => async files => {
      const images = await imagesToBase64(files);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, images[0]);
    }
  })
)(({
  label,
  active,
  onClick,
  onDrop
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
          </div>
      }
    </div>
  </div>
));
