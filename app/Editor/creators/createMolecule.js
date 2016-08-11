import {
  compose, defaultProps, createEagerElement, withProps
} from 'recompose';
import Immutable from 'immutable';

import * as Atoms from 'Atomic/Atoms';

import MoleculeWrap from '../components/MoleculeWrap';
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
      content: molecule.getIn(['atoms', index, 'content']),
      settings: molecule.getIn(['atoms', index, 'settings']),
      defaultSettings: atom.get('settings')
    }
  );
}
);

export default ({ component, props: { settings } }) =>
compose(
  // Prevent updates from parent state
  // disableUpdate(),

  // Set Component to render
  defaultProps({
    Molecule: component,
    settings
  }),

  // Connect to EditorState
  editorState,

  // We allow to move atoms inside molece
  dndState('atoms', 'molecule'),

  //
  // withPropsOnChange(['molecule'], props => {
  //   // console.log(props);
  //   return ({
  //     settings: props.molecule.get('settings')
  //   })
  // }),


  // Map atoms from state to components
  withProps(props => ({
    settings: props.molecule.get('settings') || Immutable.Map({}),
    children: mapAtoms(props.atoms, props)
  })),

  dndHandler('molecule')

)(MoleculeWrap);
