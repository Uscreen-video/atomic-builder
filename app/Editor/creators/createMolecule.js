import {
  compose, defaultProps, pure,
  withPropsOnChange, createEagerElement, withProps
} from 'recompose';

import * as Atoms from 'Atomic/Atoms';

import MoleculeWrap from '../components/MoleculeWrap';
import dndState from '../helpers/dndState';
import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

const mapAtoms = (atoms, { Cursor, add, move, molecule }) => atoms.map((atom, index) => (
  createEagerElement(
    Atoms[atom.get('type')].Component,
    {
      index, atom, key: atom.get('id'),
      add, move, Cursor: Cursor.push('atoms', index),
      settings: molecule.getIn(['atoms', index, 'settings'])
    }
  )
));

export default ({ component, props: { type } }) =>
compose(
  // Prevent updates from parent state
  // disableUpdate(),

  // Set Component to render
  defaultProps({ Molecule: component }),

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
    children: mapAtoms(props.atoms, props),
  })),

  dndHandler('molecule')

)(MoleculeWrap);
