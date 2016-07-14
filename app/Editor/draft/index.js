import { EditorState, Editor } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { compose, withState, withHandlers } from 'recompose';

import Toolbar from './Toolbar';
import blockRenderMap from './helpers/blockRenderer';
import styles from './styles.css';
import decorator from './helpers/decorator';

let editor = void 0;

export default compose(
  withState('content', 'setContent', ({ value }) =>
    !value
    && EditorState.createEmpty(decorator)
    || value instanceof EditorState
      && value
      || EditorState.createWithContent(stateFromHTML(value), decorator)
  ),
  withHandlers({
    onChange: props => state => {
      props.setContent(state, props.onChange(state))
    }
  })
)(({ content, onChange }) => (
  <div className={styles.wrap} ref={r => editor = r}>
    <Editor
      blockRenderMap={blockRenderMap}
      editorState={content}
      placeholder='Start writing text'
      onChange={onChange} />
    <Toolbar onChange={onChange} editorState={content} editor={editor} />
  </div>
));
