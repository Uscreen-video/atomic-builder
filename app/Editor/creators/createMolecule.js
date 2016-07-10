import {
  compose, defaultProps,
  withPropsOnChange, createEagerElement, withProps
} from 'recompose';
import { DropTarget as target } from 'react-dnd';

import * as Atoms from 'Atomic/Atoms';

import MoleculeWrap from '../components/MoleculeWrap';
import { molecule as targetSpec } from '../dnd/dragTarget';
import dndState from '../helpers/dndState';
import editorState from '../helpers/editorState';
import disableUpdate from '../helpers/disableUpdate';

const mapAtoms = (atoms, moleculeProps) => atoms.map((atom, key) =>
  createEagerElement(
    Atoms[atom.get('type')].Component,
    { atom, key, Cursor: moleculeProps.Cursor.push(key) }
  )
);

export default ({ component, props: { type } }) =>
compose(

  // Prevent updates from parent state
  disableUpdate('molecule'),

  // Set Component to render
  defaultProps({ Molecule: component }),

  // Connect to EditorState
  editorState,

  // We allow to move atoms inside molece
  dndState('atoms', 'molecule'),

  //
  withPropsOnChange(['molecule'], props => ({
    settings: props.molecule.get('settings')
  })),


  // Map atoms from state to components
  withProps(props => ({
    atoms: mapAtoms(props.atoms, props)
  })),

  // If molecule is empty we give ability to drop there atoms
  target('atom', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(MoleculeWrap);
