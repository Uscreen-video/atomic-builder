import cx from 'classnames';
import styles from './styles.css';
import Editor from './Editor/';
import getStyles from 'Editor/helpers/getStyles';

const Component = ({ settings, content, style }) => {
  const imagesStyles = {
    ...getStyles(settings),
    width: settings.get('width') || 200
  };

  return (
    <div style={style} className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
      <img
        src={content}
        role='presentation'
        style={imagesStyles} />
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
    <div
      className={styles.wrap}>
      {
        !active
        ? <Component {... { settings, content, style }} />
        : <Editor {...{ content, deactivate, onChange, updateSettings, settings, style }} />
      }
    </div>
  );
};
