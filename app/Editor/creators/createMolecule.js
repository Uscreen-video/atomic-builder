import { compose, defaultProps, withState, createEagerFactory, withPropsOnChange } from 'recompose';
import MoleculeWrap from '../components/MoleculeWrap';

export default ({ component }) =>
compose(
  defaultProps({ Molecule: createEagerFactory(component) }),

  withState('atoms', 'updateMolecule', ({ molecule }) => molecule.get('atoms')),

  withPropsOnChange(['molecule'], props => ({
    settings: props.molecule.get('settings')
  }))
)(MoleculeWrap);
