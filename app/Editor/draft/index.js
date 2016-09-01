import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { compose, withState, withHandlers, shouldUpdate } from 'recompose';
import { isString } from 'lodash';
import renderOptions from 'Editor/draft/helpers/renderOptions';

import Toolbar from './Toolbar';
import blockRenderMap from './helpers/blockRenderer';
import blockStyleFn from './helpers/blockStyleFn';
import styles from './styles.css';
import decorator from './helpers/decorator';

let editor = void 0;


export default compose(
  shouldUpdate(() => false),
  withState('content', 'setContent', ({ value }) => {
    if (!value) return EditorState.createEmpty(decorator);
    if (value instanceof EditorState) return value;
    if (isString(value)) return EditorState.createWithContent(stateFromHTML(value), decorator);
    return EditorState.createWithContent(convertFromRaw(value.toJS ? value.toJS() : value));
  }),
  withHandlers({
    onChange: props => state => {
      props.setContent(state, props.onChange(convertToRaw(state.getCurrentContent())));
    }
  })
)(({ content, onChange }) => (
  <div className={styles.wrap} ref={r => editor = r}>
    <Editor
      blockRenderMap={blockRenderMap}
      blockStyleFn={blockStyleFn}
      editorState={content}
      placeholder='Start writing text'
      onChange={onChange} />
    <Toolbar onChange={onChange} editorState={content} editor={editor} />
  </div>
));
