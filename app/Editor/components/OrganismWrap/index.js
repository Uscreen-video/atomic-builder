import Customizer from '../Customizer/';

export default ({
  Organism,
  isDragging,
  ...rest
}) => (
  <Customizer title='Organism' isDragging={isDragging}>
    <Organism {...rest} />
  </Customizer>
);
