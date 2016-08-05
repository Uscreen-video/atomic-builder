import cx from 'classnames';
import Draft from 'Editor/draft';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';

import styles from './styles.css';
import typo from './typo.css';

const Content = ({ content }) => {
  if (!content) return <p className={styles.placeholder}>Enter text here</p>;
  if (content instanceof EditorState) {
    const __html = stateToHTML(content.getCurrentContent());
    return <div dangerouslySetInnerHTML={{ __html }} />;
  }
  return content;
};

export default ({
  content,
  active,
  settings,
  onChange
}) => {
  console.log(settings);
return (
  <div className={cx('editor-text', styles.wrap)} style={{ backgroundColor: settings.get('backgroundColor') }}>
  {
    !active
    ? <div className={typo.content}><Content content={content} /></div>
    : <Draft value={content} onChange={onChange} />
  }
  </div>
);

}
