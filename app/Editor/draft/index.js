import Editor from 'megadraft';
import { EditorState } from 'draft-js';

import 'megadraft/dist/css/megadraft.css';

export default ({ content, onChange }) => {
  const state = !content ? EditorState.createEmpty() : content;
  return (
    <Editor
      editorState={state}
      placeholder='Start writing text'
      onChange={onChange} />
  );
}
