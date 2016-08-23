import cx from 'classnames';
import styles from './styles.css';
import Editor from './Editor/';

const getStyles = settings => {
  let res = {};
  const padding = settings.get('padding');
  if (padding) {
    const { top, right, bottom, left } = padding;
    res.padding = `${top}px ${right}px ${bottom}px ${left}px`;
  }
  return res;
};

const Component = ({ settings, content, style }) => (
  <div styles={style} className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
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
