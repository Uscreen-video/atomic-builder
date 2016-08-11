import Customizer from '../Customizer/';

export default ({
  Organism,
  isDragging,
  connectDragPreview,
  ...rest
}) => (
  <Customizer
    {...rest}
    title='Organism'
    isDragging={isDragging}
    preview={connectDragPreview}
  >
    <Organism {...rest} />
  </Customizer>
);
