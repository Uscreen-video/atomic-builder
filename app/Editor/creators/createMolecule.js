import {
  compose, defaultProps, createEagerElement, withProps
} from 'recompose';

import * as Atoms from 'Atomic/Atoms';

import MoleculeWrap from '../components/Wrappers/MoleculeWrap';
import dndState from '../dnd/state';
import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

const mapAtoms = (atoms, {
  Cursor, add, move, hover, remove, hoverIndex, molecule
}) => atoms.map((atom, index) => {
  return createEagerElement(
    Atoms[atom.get('type')].Component,
    {
      index, atom, key: atom.get('id'),
      add, move, remove, hover, hoverIndex,
      Cursor: Cursor.push('atoms', index),
      content: molecule.getIn(['atoms', index, 'content']) || atom.get('content'),
      settings: molecule.getIn(['atoms', index, 'settings']) || atom.get('settings'),
      defaultSettings: atom.get('settings')
    }
  );
}
);

export default ({ component, props: { settings: settingsMapper } }) =>
compose(
  // Prevent updates from parent state
  // disableUpdate(),

  // Set Component to render
  defaultProps({
    Molecule: component,
    settingsMapper
  }),

  // Connect to EditorState
  editorState,

  // We allow to move atoms inside molece
  dndState('atoms', 'molecule'),

  // Map atoms from state to components
  withProps(props => {
    const atoms = props.atoms.isEmpty()
      ? props.molecule.has('atoms') && props.molecule.get('atoms') || props.atoms
      : props.atoms || [];
    return ({
      children: mapAtoms(atoms, props)
    })
  }),

  dndHandler('molecule')

)(MoleculeWrap);
