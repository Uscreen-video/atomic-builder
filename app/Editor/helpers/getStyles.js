import Immutable from 'immutable';

const convertSettings = (settings, key) => (
  key in settings ? settings[key] : false
);

export default settings => {
  const convertedSettings = settings.toJS();
  const res = {};

  const colors = convertSettings(convertedSettings, 'colors');
  if (colors) {
    const { background, color } = colors;
    res.backgroundColor = background;
    if (color) {
      res.color = color;
    }
  }

  const padding = convertSettings(convertedSettings, 'padding');
  if (padding) {
    const { top, right, bottom, left } = padding;
    res.padding = `${top}px ${right}px ${bottom}px ${left}px`;
  }

  const backgroundImage = convertSettings(convertedSettings, 'backgroundImage');
  if (backgroundImage) {
    const { url, size, x, y, repeat } = backgroundImage;
    res.background = `url(${url}) ${x}px ${y}px ${repeat} ${res.backgroundColor || 'transparent'}`;
    res.backgroundSize = size;
  }

  const leftImage = convertSettings(convertedSettings, 'leftImage');
  if (leftImage) {
    const { url, size, x, y, repeat } = leftImage;
    res.leftImage = `url(${url}) ${x}px ${y}px ${repeat}`;
    res.leftImageSize = size;
  }

  const border = convertSettings(convertedSettings, 'border');
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

  const font = convertSettings(convertedSettings, 'font');
  if (font) {
    const { weight, size, family, style, transform, decoration } = font;
    res.font = `${style} ${weight} ${size}px ${family}`;
    if (transform) {
      res.textTransform = transform;
    }
    if (decoration) {
      res.textDecoration = decoration;
    }
  }

  const shadow = convertSettings(convertedSettings, 'shadow');
  if (shadow) {
    const { x, y, blur, spread, color } = shadow;
    res.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  return res;
};
