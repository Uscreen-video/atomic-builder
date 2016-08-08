import {
  compose, defaultProps, withState, withHandlers, withProps, withPropsOnChange
} from 'recompose';
import { DropTarget as target, DragSource as source } from 'react-dnd';

import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import { atom as targetSpec } from '../dnd/dragTarget';
import { atom as sourceSpec } from '../dnd/dragSource';

export default ({ component, props: { type, settings } }) =>
compose(

  // Set Component to render
  defaultProps({
    Atom: component,
    settings
  }),

  // Connect to EditorState
  editorState,
  withState('content', 'setContent', props => {
    console.log('New atom has been created!');
    props.atom.get('content');
  }),

  // Show controlls only on active element
  withState('active', 'setActive', false),
  withHandlers({
    activate: props => () => {
      props.editItem(true);
      props.setActive(true);
    },
    deactivate: props => () => {
      props.releaseItem();
      props.setActive(false);
      props.updateEditor('content', props.content);
    },
    onChange: props => props.setContent
  }),

  // If molecules has atoms we handle other atoms dragging hovering
  target('atom', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })),

  // We allow to sort atoms my drag and drop
  source('atom', sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),

)(AtomWrap);
