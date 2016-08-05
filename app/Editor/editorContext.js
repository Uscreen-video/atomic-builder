import { compose, withState, withContext, withHandlers } from 'recompose';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PropTypes } from 'react';

const { func, object, bool, number } = PropTypes;

export const withEditorContext = BaseComponent =>
compose(
  DragDropContext(HTML5Backend), // eslint-disable-line new-cap
  withState('dragingItem', 'setDraggingItem', 0),
  withState('editingItem', 'setEditingItem', { active: false, type: '' }),

  withHandlers({
    drag: props => e => {
      const { height } = e.target.getBoundingClientRect();
      return props.setDraggingItem(height);
    },
    drop: props => () => (
      props.setDraggingItem(0)
    ),
    editItem: props => () => props.setEditingItem({
      ...props.editingItem,
      active: true
    }),
    releaseItem: props => () => props.setEditingItem({
      ...props.editingItem,
      active: false
    }),
    setItem: props => obj => props.setEditingItem({
      ...props.editingItem,
      ...obj
    })
  }),

  withContext(
    {
      dragingItem: number, drag: func, drop: func,
      editItem: func, releaseItem: func, setItem: func, editingItem: object
    },
    ({ dragingItem, drag, drop, editItem, releaseItem, setItem, editingItem }) =>
    ({ dragingItem, drag, drop, editItem, releaseItem, setItem, editingItem })
  )
)(BaseComponent);
