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
  deactivate,
  settings,
  onChange
}) => {
console.log(settings.get('backgroundImage')[1]);
return (
  <div
    className={cx('editor-text', styles.wrap)}
    style={{
      background: settings.get('backgroundImage') && `url(${settings.get('backgroundImage')[0]}) 0 0 no-repeat`,
      backgroundSize: settings.get('backgroundImage') && settings.get('backgroundImage')[1],
      backgroundColor: settings.get('backgroundColor'),
      padding: settings.get('padding')
    }}>
  {
    !active
    ? <div className={typo.content}><Content content={content} /></div>
    : <Draft value={content} onChange={onChange} onBlur={deactivate} />
  }
  </div>
);
};

