import Highlight from '../Highlight/';

export default ({
  Organism,
  isDragging,
  ...rest
}) => (
  <Highlight title='Organism' isDragging={isDragging}>
    <Organism {...rest} />
  </Highlight>
);
