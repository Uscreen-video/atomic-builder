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
  const shadow = settings.get('shadow');
  if (shadow) {
    const { x, y, blur, spread, color } = shadow;
    res.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }
  const border = settings.get('border');
  if (border) {
    const { width, style, color, radius } = border;
    if (style !== 'none') {
      res.border = `${width}px ${style} ${color}`;
      if (radius) {
        res.borderRadius = `${radius}px`;
      }
    } else {
      res.border = 'none';
    }
  }
  const backgroundImage = settings.get('backgroundImage');
  if (backgroundImage) {
    const [url, cover, { x, y }, repeat] = backgroundImage;
    res.background = `url(${url}) ${x} ${y} ${repeat} ${settings.get('backgroundColor')}`;
    res.backgroundSize = cover;
  }
  return res;
};

const Component = ({ settings, content, style }) => {
  const { url, target } = settings.get('url');

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
