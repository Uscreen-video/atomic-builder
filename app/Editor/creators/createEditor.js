import {
  compose, withContext, defaultProps, withHandlers,
  withProps, createEagerElement
} from 'recompose';
import { PropTypes } from 'react';
import { List } from 'immutable';

import * as Organisms from 'Atomic/Organisms';

import dndState from '../dnd/state';
import dndHandler from '../dnd/handler';
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
    updateEditorState: props => (key, state) => {
      const mutation = props.organisms.setIn(key, state);
      props.update(mutation);
    }
  }),

  withContext({ updateEditorState: func }, ({ updateEditorState }) => ({ updateEditorState })),


  // We map organisns to to components
  withProps(({ move, add, hover, hoverIndex, ...props }) => ({
    children: props.organisms.map((organism, index) =>
      createEagerElement(
        Organisms[organism.get('type')].Component,
        {
          key: organism.get('id'),
          index, organism,
          settings: organism.has('settings') && organism.get('settings') || {},
          Cursor: props.Cursor.push(index),
          move, add, hover, hoverIndex
        }
      )
    )
  })),

  dndHandler('template'),

)(EditorWrap);
