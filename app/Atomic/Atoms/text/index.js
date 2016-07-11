import atom from 'Editor/atom';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'text',
    content: EditorState.createWithContent(stateFromHTML('<p>Write some text</p>')),
    settings: {}
  }
});
