import Highlight from '../Highlight/';

export default ({
  Atom,
  ...rest
}) => (
  <div>
    <Highlight title='atom' outside>
      <Atom {...rest} />
    </Highlight>
  </div>
);
