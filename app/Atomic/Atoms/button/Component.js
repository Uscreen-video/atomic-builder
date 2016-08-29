import cx from 'classnames';
import Immutable from 'immutable';
import styles from './styles.css';
import Editor from './Editor/';
import getStyles from 'Editor/helpers/getStyles';

const Component = ({ settings, content, style }) => {
  const { url, target } = settings.link;

  return (
    <div className={cx(styles.wrap, styles[`align_${settings.align}`])}>
      <a
        style={style}
        href={url}
        className={cx(styles.button, styles[`button_${settings.type}`])}
        target={target}>
        { content }
      </a>
    </div>
  );
};

export default ({
  content,
  active,
  deactivate,
  settings,
  onChange,
  updateSettings
}) => {
  const style = getStyles(settings);
  return (
    <div>
      {
        !active
        ? <Component {...{ settings: settings.toJS(), content, style }} />
        : <Editor {...{ content, deactivate, onChange, updateSettings, settings: settings.toJS(), style }} />
      }
    </div>
  );
};
