import { compose, defaultProps, withState, withHandlers } from 'recompose';

import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

export default ({ component, props: { settings: settingsMapper } }) =>
compose(

  // Set Component to render
  defaultProps({
    Atom: component,
    settingsMapper
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
      props.editContent(props.Cursor);
      props.setActive(true);
    },
    deactivate: props => () => {
      props.releaseItem();
      props.setActive(false);
      props.updateEditor('content', props.content);
    },
    updateSettings: props => data => {
      const mutation = props.settings.merge(data);
      props.updateEditor('settings', mutation);
    },
    onChange: props => props.setContent
  }),

  dndHandler('atom', 'atom')
)(AtomWrap);
