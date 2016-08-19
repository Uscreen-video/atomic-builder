import cx from 'classnames';
import styles from './styles.css';
import Editor from './Editor/';

const Component = ({ settings, content }) => (
  <div className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
    <a
      href={settings.get('url')}
      className={cx(styles.button, styles[`button_${settings.get('type')}`])}>
      { content }
    </a>
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
  <div>
    {
      !active
      ? <Component {... { settings, content }} />
      : <Editor {...{ content, deactivate, onChange, updateSettings, settings }} />
    }
  </div>
);
