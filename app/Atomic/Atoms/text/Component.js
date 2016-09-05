import cx from 'classnames';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import Editor from './Editor';
import renderOptions from 'Editor/draft/helpers/renderOptions';
import getStyles from 'Editor/helpers/getStyles';
import { isObject } from 'lodash';
import styles from './styles.css';
import typo from './typo.css';

const toHTML = convertToHTML(renderOptions);

const Content = ({ content }) => {
  if (!content) return <p className={styles.placeholder}>Enter text here</p>;
  if (isObject(content)) {
    const __html = toHTML(convertFromRaw(content.toJS ? content.toJS() : content));
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
