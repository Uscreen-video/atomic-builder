import {
  compose, defaultProps, createEagerFactory,
  createEagerElement, withProps
} from 'recompose';

import * as Molecules from 'Atomic/Molecules';

import OrganismWrap from '../components/OrganismWrap';
import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

const mapMolecules = (molecules, { Cursor }) => molecules.map((molecule, key) => {
  return createEagerElement(
    Molecules[molecule.get('type')].Component,
    {
      key, molecule,
      settings: molecule.has('settings') && molecule.get('settings') || {},
      theme: molecule.has('theme') && molecule.get('theme').toJS() || void 0,
      Cursor: Cursor.push('molecules', key)
    }
  );
}
);

export default ({ component }) =>
compose(

  // Create lazy-evaluating component to render
  defaultProps({ Organism: createEagerFactory(component) }),

  // Connect to EditorState
  editorState,

  // We pass molecules as props to organism
  withProps(props => ({
    settings: props.organism.get('settings'),
    molecules: mapMolecules(props.organism.get('molecules'), props)
  })),

  dndHandler('organism'),

)(OrganismWrap);
