import Highlight from '../Highlight/';

export default ({
  Organism,
  connectDropTarget,
  connectDragSource,
  isDragging,
  ...rest
}) => connectDragSource(connectDropTarget(
  <div>
    <Highlight title='Organism' isDragging={isDragging}>
      <Organism {...rest} />
    </Highlight>
  </div>
));
