import { compose, withState, withContext, withHandlers } from 'recompose';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PropTypes } from 'react';

const { func, object } = PropTypes;

export const withEditorContext = BaseComponent =>
compose(
  DragDropContext(HTML5Backend), // eslint-disable-line new-cap

  withState('dragingItem', 'setDraggingItem', void 0),

  withHandlers({
    drag: props => item => props.setDraggingItem(item),
    drop: props => () => props.setDraggingItem(void 0)
  }),

  withContext(
    { dragingItem: object, drag: func, drop: func },
    ({ dragingItem, drag, drop }) => ({ dragingItem, drag, drop })
  )
)(BaseComponent);
