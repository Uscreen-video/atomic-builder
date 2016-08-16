import { compose, withState, withContext, withHandlers } from 'recompose';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { monitor } from './dnd/immutable';

import { PropTypes } from 'react';

const { func, object, bool } = PropTypes;

export const withEditorContext = BaseComponent =>
compose(
  DragDropContext(HTML5Backend), // eslint-disable-line new-cap

  withState('dragingItem', 'setDraggingItem', monitor),
  withState('editingItem', 'setEditingItem', { active: false, type: '', isAnyEditing: false }),

  withHandlers({
    drag: props => dragItem => props.setDraggingItem(props.dragingItem.init(dragItem)),
    drop: props => () => props.setDraggingItem(props.dragingItem.reset()),
    hover: props => index => props.setDraggingItem(props.dragingItem.hover(index)),
    editItem: props => () => props.setEditingItem({
      ...props.editingItem,
      isAnyEditing: true
    }),
    releaseItem: props => () => {
      console.log('RELEASE');
      props.setEditingItem({
        ...props.editingItem,
        active: false,
        isAnyEditing: false
      })
    },
    setItem: props => obj => props.setEditingItem({
      ...props.editingItem,
      ...obj
    })
  }),

  withContext(
    {
      dragingItem: object,
      drag: func,
      drop: func,
      editItem: func,
      releaseItem: func,
      setItem: func,
      editingItem: object
    },
    ({ dragingItem, drag, drop, editItem, releaseItem, setItem, editingItem }) =>
    ({ dragingItem, drag, drop, editItem, releaseItem, setItem, editingItem })
  )
)(BaseComponent);
