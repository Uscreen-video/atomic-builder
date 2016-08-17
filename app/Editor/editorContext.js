import { PropTypes } from 'react';

import { compose, withState, withContext, withHandlers } from 'recompose';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Monitor from './immutable/dndMonitor';
import EditingItem from './immutable/editingItem';

const { func, object } = PropTypes;

export const withEditorContext = BaseComponent =>
compose(
  DragDropContext(HTML5Backend), // eslint-disable-line new-cap

  withState('dragingItem', 'setDraggingItem', Monitor),
  withState('editingItem', 'editItem', EditingItem),

  withHandlers({
    drag: props => dragItem => props.setDraggingItem(props.dragingItem.init(dragItem)),
    drop: props => () => props.setDraggingItem(props.dragingItem.reset()),
    hover: props => index => props.setDraggingItem(props.dragingItem.hover(index)),

    editContent: props => data => props.editItem(props.editingItem.editContent(data)),
    editSettings: props => data => props.editItem(props.editingItem.editSettings(data)),
    releaseItem: props => () => props.editItem(props.editingItem.release())
  }),

  withContext(
    {
      dragingItem: object,
      drag: func,
      drop: func,
      editContent: func,
      editSettings: func,
      releaseItem: func,
      editingItem: object
    },
    ({ dragingItem, drag, drop, releaseItem, editContent, editSettings, editingItem }) =>
    ({ dragingItem, drag, drop, releaseItem, editContent, editSettings, editingItem })
  )
)(BaseComponent);
