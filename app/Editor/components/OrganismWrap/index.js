import Highlight from '../Highlight/';

export default ({
  Organism,
  isDragging,
  connectDragPreview,
  ...rest
}) => (
  <Highlight title='Organism' isDragging={isDragging} preview={connectDragPreview}>
    <Organism {...rest} />
  </Highlight>
);
