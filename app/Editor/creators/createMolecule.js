import {
  compose, defaultProps,
  withPropsOnChange, createEagerElement, withProps,
  setDisplayName
} from 'recompose';
import { DropTarget as target } from 'react-dnd';

import MoleculeWrap from '../components/MoleculeWrap';

import { molecule as targetSpec } from '../dnd/dragTarget';
import dndState from '../helpers/dndState';
import * as Atoms from 'Atomic/Atoms';
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
  disableUpdate,

  setDisplayName(`Molecule:${type}`),

  defaultProps({
    Molecule: component
  }),

  editorState,

  dndState('atoms', 'molecule'),

  withPropsOnChange(['molecule'], props => ({
    settings: props.molecule.get('settings')
  })),

  withProps(props => ({
    atoms: mapAtoms(props.atoms, props)
  })),

  target('atom', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(MoleculeWrap);
