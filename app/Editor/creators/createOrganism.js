import {
  compose, defaultProps,
  createEagerFactory, createEagerElement, withPropsOnChange
} from 'recompose';
import OrganismWrap from '../components/OrganismWrap';

import * as Molecules from 'Atomic/Molecules';

const mapMolecules = molecules => molecules.map((molecule, key) =>
  createEagerElement(Molecules[molecule.get('type')].Component, { key, molecule })
);

export default ({ component }) =>
compose(
  defaultProps({ Organism: createEagerFactory(component) }),

  withPropsOnChange(['organism'], props => ({
    ...mapMolecules(props.organism.get('molecules')).toJS(),
    settings: props.organism.get('settings')
  }))
)(OrganismWrap);
