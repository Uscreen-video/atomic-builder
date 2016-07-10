import {
  compose, withContext, defaultProps, withHandlers,
  withPropsOnChange, createEagerElement
} from 'recompose';
import { DropTarget as target } from 'react-dnd';
import { PropTypes } from 'react';
import { List } from 'immutable';

import * as Organisms from 'Atomic/Organisms';

import dndState from '../helpers/dndState';
import { template as targetSpec } from '../dnd/dragTarget';
import EditorWrap from '../components/EditorWrap';

const { func } = PropTypes;
const Cursor = List([]); // eslint-disable-line new-cap

export default () =>
compose(

  // Create initial cursor,
  // Cursor must will be expanded in each level
  defaultProps({ Cursor }),

  // We allow to drag&drop organisms inside editor
  // Also we dont fire commit of changes, because its own state
  dndState('organisms', 'data', false),

  // EditorState from [dndState] and updater
  // Updater recieve an array of nesting and mutation
  withHandlers({
    updateEditorState: props => (key, state) => props.update(props.organisms.setIn(key, state))
  }),

  withContext({ updateEditorState: func }, ({ updateEditorState }) => ({ updateEditorState })),

  // We map organisns to to components
  withPropsOnChange(['organisms'], ({ move, add, ...props }) => ({
    children: props.organisms.map((organism, index) =>
      createEagerElement(
        Organisms[organism.get('type')].Component,
        { key: organism.get('id'), index, organism, Cursor: props.Cursor.push(index), move, add }
      )
    )
  })),

  // We allow to drop organisms in editor if its empty
  target('organism', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(EditorWrap);
