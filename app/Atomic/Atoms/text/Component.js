import cx from 'classnames';
import { convertToHTML } from 'Editor/draft/convert';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from './Editor';
import renderOptions from 'Editor/draft/helpers/renderOptions';

import styles from './styles.css';
import typo from './typo.css';

const toHTML = convertToHTML(renderOptions);

const getStyles = settings => {
  const res = {
    backgroundColor: settings.get('backgroundColor')
  };

  const padding = settings.get('padding');
  if (padding) {
    const { top, right, bottom, left } = padding;
    res.padding = `${top}px ${right} ${bottom} ${left}`;
  }

  const backgroundImage = settings.get('backgroundImage');
  if (backgroundImage) {
    const [url, cover, { x, y }, repeat] = backgroundImage;
    res.background = `url(${url}) ${x} ${y} ${repeat} ${settings.get('backgroundColor')}`;
    res.backgroundSize = cover;
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

  const shadow = settings.get('shadow');
  if (shadow) {
    const { x, y, blur, spread, color } = shadow;
    res.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  return res;
};

const Content = ({ content }) => {
  if (!content) return <p className={styles.placeholder}>Enter text here</p>;
  if (content instanceof EditorState) {
    const __html = toHTML(content.getCurrentContent());
    return <div dangerouslySetInnerHTML={{ __html }} />;
  }
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ({
  content,
  active,
  deactivate,
  settings,
  onChange
}) => (
  <div className={cx('editor-text', styles.wrap)} style={getStyles(settings)}>
  {
    !active
    ? <div className={typo.content}><Content content={content} /></div>
    : <Editor value={content} onChange={onChange} deactivate={deactivate} />
  }
  </div>
);
