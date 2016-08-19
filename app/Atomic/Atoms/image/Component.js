import cx from 'classnames';
import styles from './styles.css';
import Editor from './Editor/';

const Component = ({ settings, content }) => (
  <div className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
    <img
      src={content}
      role='presentation'
      style={{ width: settings.get('width') || 200 }} />
  </div>
);

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
      ? <Component {... { settings, content }} />
      : <Editor {...{ content, deactivate, onChange, updateSettings, settings }} />
    }
  </div>
);
