import {
  compose, defaultProps, withProps, withState
} from 'recompose';
import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import disableUpdate from '../helpers/disableUpdate';

export default ({ component, props: { type } }) =>
compose(

  // Prevent component update from editor state
  disableUpdate('atom'),

  // Set Component to render
  defaultProps({
    Atom: component
  }),

  // Connect to EditorState
  editorState,


  // Show controlls only on active element
  withState('active', 'setActive', false),

)(AtomWrap);
