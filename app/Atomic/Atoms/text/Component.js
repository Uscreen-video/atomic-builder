import styles from './styles.css';
import cx from 'classnames';
import Draft from 'Editor/draft';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import decorator from 'Editor/draft/helpers/decorator';

const Content = ({ content }) => {
  if (!content) return <div className={styles.placeholder}>Enter text here</div>;
  if (content instanceof EditorState) {
    const __html = stateToHTML(content.getCurrentContent(decorator));
    return <div dangerouslySetInnerHTML={{ __html }} />;
  }
  return <div>{content}</div>;
};

export default ({
  content,
  active,
  onChange
}) => (
  <div className={cx('editor-text', styles.wrap)}>
  {
    !active
    ? <Content content={content} />
    : <Draft value={content} onChange={onChange} />
  }
  </div>
);
