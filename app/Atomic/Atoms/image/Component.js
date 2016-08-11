import cx from 'classnames';
import styles from './styles.css';
import Editor from './Editor/';

export default ({
  content,
  active,
  deactivate,
  settings,
  onChange,
  updateSettings
}) => (
  <div
    className={styles.wrap}>
    {
      !active
      ? <img
        src={content}
        role='presentation'
        style={{
          width: settings.get('width'),
          height: settings.get('height')
        }} />
      : <Editor {...{ content, deactivate, onChange, updateSettings, settings }} />
    }
  </div>
);
