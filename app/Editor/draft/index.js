import { EditorState, Editor } from 'draft-js';
import { convertFromHTML } from 'Editor/draft/convert';
import { compose, withState, withHandlers, shouldUpdate } from 'recompose';

import renderOptions from 'Editor/draft/helpers/renderOptions';

import Toolbar from './Toolbar';
import blockRenderMap from './helpers/blockRenderer';
import blockStyleFn from './helpers/blockStyleFn';
import styles from './styles.css';
import decorator from './helpers/decorator';

let editor = void 0;

const converter = convertFromHTML(renderOptions);

export default compose(
  shouldUpdate(() => false),
  withState('content', 'setContent', ({ value }) =>
    !value
    && EditorState.createEmpty(decorator)
    || value instanceof EditorState
      && value
      || EditorState.createWithContent(converter(value), decorator)
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
      blockStyleFn={blockStyleFn}
      editorState={content}
      placeholder='Start writing text'
      onChange={onChange} />
    <Toolbar onChange={onChange} editorState={content} editor={editor} />
  </div>
));
