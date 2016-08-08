import {
  compose, defaultProps, withState, withHandlers, withProps
} from 'recompose';

import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

export default ({ component, props: { type } }) =>
compose(

  // Set Component to render
  defaultProps({
    Atom: component
  }),

  // Connect to EditorState
  editorState,

  withState('content', 'setContent', props => props.content || props.atom.get('content')),

  // Show controlls only on active element
  withState('active', 'setActive', false),

  withHandlers({
    activate: props => () => {
      props.editItem(true);
      props.setActive(true)
    },
    deactivate: props => () => {
      props.releaseItem();
      props.setActive(false);
      props.updateEditor('content', props.content);
    },
    onChange: props => props.setContent,
  }),

  dndHandler('atom')

)(AtomWrap);
