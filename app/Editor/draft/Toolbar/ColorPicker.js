import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { EditorState, RichUtils, Entity } from 'draft-js';
import styles from './styles.css';

const previewsColor = [];

function manageColors(color) {
  if (previewsColor.includes(color)) return;
  if (previewsColor.length > 10) previewsColor.shift();
  previewsColor.push(color);
}

const Color = withHandlers({
  setColor: props => e => {
    e.preventDefault();
    props.onChange(props.color);
    props.onSubmit(e);
  }
})(({
  color: background,
  setColor
}) => (
  <div className={styles.color} style={{ background }} onClick={setColor} />
));


export default compose(
  withState('color', 'setColor', ''),
  withHandlers({
    updateColor: props => e => props.setColor(e.target.value),
    onSubmit: ({ editorState, onChange, color, onCancel }) => e => {
      e.preventDefault();
      onCancel(false);
      manageColors(color);
      const entityKey = Entity.create('COLOR', 'MUTABLE', { color });
      const newState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      onChange(EditorState.forceSelection(newState, editorState.getSelection()));
    }
  }),
  lifecycle({
    componentWillReceiveProps(next) {
      if (!next.entityKey) return;
      const nextColor = Entity.get(next.entityKey).getData().color;
      if (!!nextColor && nextColor !== this.props.color) {
        this.props.setColor(nextColor);
      }
    }
  })
)(({
  onSubmit,
  updateColor,
  setColor
}) => (
  <form onSubmit={onSubmit} styles={styles.linkWrap}>
    {
      !!previewsColor.length &&
        <div className={styles.colors}>
          <p className={styles.colorsTitle}>previously selected:</p>
          {
            previewsColor.map((color, key) =>
              <Color key={key} color={color} onChange={setColor} onSubmit={onSubmit} />
            )
          }
        </div>
    }
    <input
      className={styles.link}
      onChange={updateColor}
      placeholder='#333333' />
  </form>
));
