import Highlight from '../Highlight/';

export default ({
  Organism,
  connectDropTarget,
  connectDragSource,
  ...rest
}) => connectDragSource(connectDropTarget(
  <div>
    <Highlight title='Organism'>
      <Organism {...rest} />
    </Highlight>
  </div>
));
