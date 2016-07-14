import {
  compose, defaultProps, withState, withHandlers
} from 'recompose';
import { DropTarget as target, DragSource as source } from 'react-dnd';

import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import disableUpdate from '../helpers/disableUpdate';
import { atom as targetSpec } from '../dnd/dragTarget';
import { atom as sourceSpec } from '../dnd/dragSource';

export default ({ component, props: { type } }) =>
compose(

  // Prevent component update from editor state
  // disableUpdate('atom'),

  // Set Component to render
  defaultProps({
    Atom: component
  }),

  // Connect to EditorState
  editorState,

  withState('content', 'setContent', props => props.atom.get('content')),

  // Show controlls only on active element
  withState('active', 'setActive', false),

  withHandlers({
    activate: props => () => props.setActive(true),
    deactivate: props => () => props.setActive(false),
    onChange: props => data => {
      console.log(data);
      props.setContent(data, props.updateEditor('content', data))
    }
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
