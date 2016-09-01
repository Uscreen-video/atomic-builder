import cx from 'classnames';
import Immutable from 'immutable';
import tinycolor from 'tinycolor2';
import styles from './styles.css';
import Editor from './Editor/';
import getStyles from 'Editor/helpers/getStyles';

const Component = ({ settings, content, style }) => {
  const { url, target } = settings.link;
  const { backgroundColor } = style;
  const convertedColor = tinycolor(backgroundColor).isDark()
    ? tinycolor(backgroundColor).brighten(20).toString()
    : tinycolor(backgroundColor).darken().toString();

  return (
    <div className={cx(styles.wrap, styles[`align_${settings.align}`])}>
      <div
        style={{ backgroundColor: convertedColor }}
        className={styles.buttonContainer}>
        <a
          style={style}
          href={url}
          className={cx(styles.button, styles[`button_${settings.type}`])}
          data-hover='#333'
          target={target}>
          { content }
        </a>
      </div>
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
