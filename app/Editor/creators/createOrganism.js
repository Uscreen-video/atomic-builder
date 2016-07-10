import {
  compose, defaultProps, setDisplayName, withProps,
  createEagerFactory, createEagerElement, withPropsOnChange
} from 'recompose';

import OrganismWrap from '../components/OrganismWrap';

import * as Molecules from 'Atomic/Molecules';
import editorState from '../helpers/editorState';
import disableUpdate from '../helpers/disableUpdate';

const mapMolecules = (molecules, organismProps) => molecules.map((molecule, key) => props =>
  createEagerElement(
    Molecules[molecule.get('type')].Component,
    { ...props, key, molecule, Cursor: organismProps.Cursor.push(key) }
  )
).toObject();

export default ({ component, props: { type } }) =>
compose(
  disableUpdate,
  setDisplayName(`Organism:${type}`),

  defaultProps({ Organism: createEagerFactory(component) }),

  editorState,

  withPropsOnChange(['organism'], props => ({
    ...mapMolecules(props.organism.get('molecules'), props),
    settings: props.organism.get('settings')
  }))
)(OrganismWrap);
