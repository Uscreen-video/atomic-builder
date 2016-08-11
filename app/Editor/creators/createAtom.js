import { compose, defaultProps, withState, withHandlers } from 'recompose';
import { DropTarget as target, DragSource as source } from 'react-dnd';

import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

export default ({ component, props: { settings } }) =>
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
    return props.atom.get('content') || props.content;
  }),

  // Show controlls only on active element
  withState('active', 'setActive', false),
  withHandlers({
    activate: props => () => {
      // props.editItem(true);
      props.setActive(true);
    },
    deactivate: props => () => {
      // props.releaseItem();
      props.setActive(false);
      props.updateEditor('content', props.content);
    },
    onChange: props => props.setContent
  }),

  dndHandler('atom', 'atom')
)(AtomWrap);
