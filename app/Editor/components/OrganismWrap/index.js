import Customizer from '../Customizer/';

export default ({
  Organism,
  isDragging,
  connectDragPreview,
  ...rest
}) => (
  <Customizer title='Organism' isDragging={isDragging} preview={connectDragPreview}>
    <Organism {...rest} />
  </Customizer>
);
