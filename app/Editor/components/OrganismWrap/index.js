import Highlight from '../Highlight/';

export default ({
  Organism,
  ...rest
}) => <div><Highlight title='Organism'><Organism {...rest} /></Highlight></div>;
