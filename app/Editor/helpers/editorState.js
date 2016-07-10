import { compose, getContext, withPropsOnChange } from 'recompose';
import { PropTypes } from 'react';

const { func } = PropTypes;

export default compose(
  getContext({ updateEditorState: func }),
  withPropsOnChange(['Cursor'], props => ({
    updateEditor: (key, state) => {
      const cursor = props.Cursor.push(key);
      console.log(cursor.join(' > '));
      return props.updateEditorState(cursor, state)
    }
  }))
);
