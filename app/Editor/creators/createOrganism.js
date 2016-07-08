import {
  compose, defaultProps, setDisplayName,
  createEagerFactory, createEagerElement, withPropsOnChange
} from 'recompose';
import OrganismWrap from '../components/OrganismWrap';

import * as Molecules from 'Atomic/Molecules';

const mapMolecules = molecules => molecules.map((molecule, key) => props =>
  createEagerElement(Molecules[molecule.get('type')].Component, { ...props, key, molecule })
);

export default ({ component, props: { type } }) =>
compose(
  setDisplayName(`Organism:${type}`),

  defaultProps({ Organism: createEagerFactory(component) }),

  withPropsOnChange(['organism'], props => ({
    ...mapMolecules(props.organism.get('molecules')).toObject(),
    settings: props.organism.get('settings')
  }))
)(OrganismWrap);
