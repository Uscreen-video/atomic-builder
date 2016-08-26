import cx from 'classnames';
import Immutable from 'immutable';
import styles from './styles.css';
import Editor from './Editor/';
import getStyles from 'Editor/helpers/getStyles';

const Component = ({ settings, content, style }) => {
  const settingValue = settings.get('url');
  const link = (
      Immutable.Iterable.isIterable(settingValue)
      ? settingValue.toJS()
      : settingValue
    );
  const { url, target } = link;

  return (
    <div className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
      <a
        style={style}
        href={url}
        className={cx(styles.button, styles[`button_${settings.get('type')}`])}
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
        ? <Component {... { settings, content, style }} />
        : <Editor {...{ content, deactivate, onChange, updateSettings, settings, style }} />
      }
    </div>
  );
};
