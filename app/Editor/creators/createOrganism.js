import {
  compose, defaultProps, createEagerFactory,
  createEagerElement, withProps, lifecycle
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

  lifecycle({
    componentWillMount() {
      const { organism, updateEditor } = this.props;
      if (!!organism.get('molecules').findKey(_molecule => !_molecule.has('settings'))) {
        // const settings = settingsToObject(settingsMapper);
        const mutation = organism.get('molecules').map(_molecule => {
          if (_molecule.has('settings')) return _molecule;
          return _molecule.set('settings', Map({})); // eslint-disable-line new-cap
        });
        updateEditor('molecules', mutation);
      }
    }
  }),

  // We pass molecules as props to organism
  withProps(props => ({
    molecules: mapMolecules(props.organism.get('molecules'), props)
  })),

  dndHandler('organism'),

)(OrganismWrap);
