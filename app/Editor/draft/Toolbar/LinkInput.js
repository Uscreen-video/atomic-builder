import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { EditorState, RichUtils, Entity } from 'draft-js';
import styles from './styles.css';

export default compose(
  withState('link', 'setLink', ''),
  withHandlers({
    updateLink: props => e => props.setLink(e.target.value),
    onSubmit: ({ editorState, onChange, link, onCancel }) => e => {
      e.preventDefault();
      onCancel(false);
      const entityKey = Entity.create('LINK', 'MUTABLE', link);
      const newState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      onChange(EditorState.forceSelection(newState, editorState.getSelection()));
    }
  })
)(({
  onSubmit,
  updateLink
}) => (
  <form onSubmit={onSubmit} styles={styles.linkWrap}>
    <input
      className={styles.link}
      onChange={updateLink}
      placeholder='Enter link and click enter' />
  </form>
));
