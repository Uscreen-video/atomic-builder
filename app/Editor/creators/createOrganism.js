import {
  compose, defaultProps, createEagerFactory,
  createEagerElement, withProps
} from 'recompose';

import * as Molecules from 'Atomic/Molecules';
import { Map } from 'immutable';

import OrganismWrap from '../components/OrganismWrap';
import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

const mapMolecules = (molecules, { Cursor }) => molecules.map((molecule, key) => {
  return createEagerElement(
    Molecules[molecule.get('type')].Component,
    {
      key, molecule,
      settings: molecule.get('settings') || Map({}),
      theme: molecule.has('theme') && molecule.get('theme').toJS() || void 0,
      Cursor: Cursor.push('molecules', key)
    }
  );
}
);

export default ({ component, props: { settings: settingsMapper } }) =>
compose(

  // Create lazy-evaluating component to render
  defaultProps({
    settingsMapper,
    Organism: createEagerFactory(component)
  }),

  // Connect to EditorState
  editorState,

  // We pass molecules as props to organism
  withProps(props => ({
    molecules: mapMolecules(props.organism.get('molecules'), props)
  })),

  dndHandler('organism'),

)(OrganismWrap);
