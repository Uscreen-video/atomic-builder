export default ({
  Atom,
  ...rest
}) => {
  console.log(Atom);
  return (
    <div><Atom {...rest} /></div>
  );
}
