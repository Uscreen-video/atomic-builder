import {
  compose, defaultProps,
  createEagerFactory, createEagerElement, withPropsOnChange
} from 'recompose';

import * as Molecules from 'Atomic/Molecules';

import OrganismWrap from '../components/OrganismWrap';
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
  // Prevent updates from parent
  disableUpdate('organism'),

  // Create lazy-evaluating component to render
  defaultProps({ Organism: createEagerFactory(component) }),

  // Connect to EditorState
  editorState,

  // We pass molecules as props to organism
  withPropsOnChange(['organism'], props => ({
    ...mapMolecules(props.organism.get('molecules'), props),
    settings: props.organism.get('settings')
  }))
)(OrganismWrap);
