import {
  compose, defaultProps, createEagerFactory,
  withPropsOnChange, createEagerElement, withProps,
  setDisplayName
} from 'recompose';
import MoleculeWrap from '../components/MoleculeWrap';
import { DropTarget as target } from 'react-dnd';

import { molecule as targetSpec } from '../dnd/dragTarget';
import withActions from '../dnd/actions';
import * as Atoms from 'Atomic/Atoms';

const mapAtoms = atoms => atoms.map((atom, key) =>
  createEagerElement(Atoms[atom.get('type')].Component, { atom, key })
);

export default ({ component, props: { type } }) =>
compose(
  setDisplayName(`Molecule:${type}`),

  defaultProps({
    Molecule: component
  }),

  withActions('atoms', 'molecule'),

  withPropsOnChange(['molecule'], props => ({
    settings: props.molecule.get('settings')
  })),

  withProps(props => ({
    children: mapAtoms(props.atoms)
  })),

  target('atom', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(MoleculeWrap);
