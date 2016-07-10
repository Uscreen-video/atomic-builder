import {
  compose, defaultProps, withProps,
  setDisplayName
} from 'recompose';
import AtomWrap from '../components/AtomWrap';

import editorState from '../helpers/editorState';
import disableUpdate from '../helpers/disableUpdate';

export default ({ component, props: { type } }) =>
compose(
  disableUpdate,

  setDisplayName(`Atom:${type}`),

  defaultProps({
    Atom: component
  }),

  editorState,

  withProps(props => ({
    Cursor: props.Cursor.push(props.index)
  })),

)(AtomWrap);
