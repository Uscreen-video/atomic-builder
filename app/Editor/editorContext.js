import { compose, withState, withContext, withHandlers } from 'recompose';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import monitor from './dnd/monitor';

import { PropTypes } from 'react';

const { func, object, bool } = PropTypes;

export const withEditorContext = BaseComponent =>
compose(
  DragDropContext(HTML5Backend), // eslint-disable-line new-cap

  withState('dragingItem', 'setDraggingItem', monitor),
  withState('editingItem', 'setEditingItem', false),

  withHandlers({
    drag: props => dragItem => props.setDraggingItem(props.dragingItem.init(dragItem)),
    drop: props => () => props.setDraggingItem(props.dragingItem.reset()),
    hover: props => index => props.setDraggingItem(props.dragingItem.hover(index)),
    editItem: props => () => props.setEditingItem(true),
    releaseItem: props => () => props.setEditingItem(false)
  }),

  withContext(
    {
      dragingItem: object, drag: func, drop: func, hover: func,
      editItem: func, releaseItem: func, editingItem: bool
    },
    ({ dragingItem, drag, drop, hover, editItem, releaseItem, editingItem }) =>
    ({ dragingItem, drag, drop, hover, editItem, releaseItem, editingItem })
  )
)(BaseComponent);
