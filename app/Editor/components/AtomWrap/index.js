import Highlight from '../Highlight/';

export default ({
  Atom,
  activate,
  connectDragPreview,
  isDragging,
  ...props
}) => (
  <div onClick={!props.active && !isDragging && activate}>
    <Highlight title='atom' outside isDragging={isDragging} preview={connectDragPreview}>
      <Atom {...props} />
    </Highlight>
  </div>
);
