import { compose, getContext, withPropsOnChange } from 'recompose';
import { PropTypes } from 'react';

const { func } = PropTypes;

export default compose(
  getContext({ updateEditorState: func }),
  withPropsOnChange(['Cursor'], props => ({
    updateEditor: (key, state) => props.updateEditorState(props.Cursor.push(key).toArray(), state)
  }))
);
