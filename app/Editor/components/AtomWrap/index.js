import Highlight from '../Highlight/';

export default ({
  Atom,
  connectDropTarget,
  connectDragSource,
  ...rest
}) => connectDragSource(connectDropTarget(
  <div>
    <Highlight title='atom' outside>
      <Atom {...rest} />
    </Highlight>
  </div>
));
