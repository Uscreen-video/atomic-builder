import styles from './styles.css';
import cx from 'classnames';
import Draft from 'Editor/draft';
import { stateToHTML } from 'draft-js-export-html';

const Content = ({ content }) =>
  !!content
  && <div dangerouslySetInnerHTML={{ __html: stateToHTML(content.getCurrentContent()) }} />
  || <div className={styles.placeholder}>Enter text here</div>;

export default ({
  content,
  active,
  onChange
}) => (
  <div className={cx('editor-text', styles.wrap)}>
  {
    !active
    ? <Content content={content} />
    : <Draft content={content} onChange={onChange} />
  }
  </div>
);
