import Immutable from 'immutable';

const convertSettings = (settings, key) => {
  const settingsValue = settings.get(key);
  return Immutable.Iterable.isIterable(settingsValue)
    ? settingsValue.toJS()
    : settingsValue;
};

export default settings => {
  const res = {};

  const colors = convertSettings(settings, 'colors');
  if (colors) {
    const { background, color } = colors;
    res.backgroundColor = background;
    if (color) {
      res.color = color;
    }
  }

  const padding = convertSettings(settings, 'padding');
  if (padding) {
    const { top, right, bottom, left } = padding;
    res.padding = `${top}px ${right} ${bottom} ${left}`;
  }

  const backgroundImage = convertSettings(settings, 'backgroundImage');
  if (backgroundImage) {
    const { url, size, x, y, repeat } = backgroundImage;
    res.background = `url(${url}) ${x} ${y} ${repeat} ${res.backgroundColor || 'transparent'}`;
    res.backgroundSize = size;
  }

  const leftImage = convertSettings(settings, 'leftImage');
  if (leftImage) {
    const [url, size, { x, y }, repeat] = leftImage;
    res.leftImage = `url(${url}) ${x} ${y} ${repeat}`;
  }

  const border = convertSettings(settings, 'border');
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

  const font = convertSettings(settings, 'font');
  if (font) {
    const { weight, size, family, style } = font;
    res.font = `${style} ${weight} ${size}px ${family}`;
  }

  const shadow = convertSettings(settings, 'shadow');
  if (shadow) {
    const { x, y, blur, spread, color } = shadow;
    res.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  return res;
};
