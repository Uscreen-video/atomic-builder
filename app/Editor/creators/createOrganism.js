import {
  compose, defaultProps, shouldUpdate,
  createEagerFactory, createEagerElement, withProps
} from 'recompose';
import { DropTarget as target, DragSource as source } from 'react-dnd';

import * as Molecules from 'Atomic/Molecules';

import OrganismWrap from '../components/OrganismWrap';
import editorState from '../helpers/editorState';
import disableUpdate from '../helpers/disableUpdate';
import { organism as targetSpec } from '../dnd/dragTarget';
import { organism as sourceSpec } from '../dnd/dragSource';

const mapMolecules = (molecules, Cursor) => molecules.map((molecule, key) => props =>
  createEagerElement(
    Molecules[molecule.get('type')].Component,
    { ...props, key, molecule, Cursor: Cursor.push('molecules', key) }
  )
);

export default ({ component, props: { type } }) =>
compose(
  // Prevent updates from parent
  // disableUpdate(),

  // Create lazy-evaluating component to render
  defaultProps({ Organism: createEagerFactory(component) }),

  // Connect to EditorState
  editorState,

  // We pass molecules as props to organism
  withProps(props => ({
    settings: props.organism.get('settings'),
    molecules: mapMolecules(props.organism.get('molecules'), props.Cursor)
  })),


  // If editor has molecules we handle other organsm dragging hovering
  target('organism', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })),

  // We allow to sort organisms my drag and drop
  source('organism', sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),

  shouldUpdate((prev, next) => {
    return false
  }),
)(OrganismWrap);
