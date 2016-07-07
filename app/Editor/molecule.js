import createMolecule from './creators/createMolecule';

export default data => ({
  Component: createMolecule(data)
});
