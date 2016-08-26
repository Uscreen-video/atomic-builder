import {
  compose, withContext, defaultProps, withHandlers,
  withProps, createEagerElement, lifecycle, toClass
} from 'recompose';
import { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { renderToStaticMarkup } from 'react-dom/server';
import { withEditorContext } from 'Editor/editorContext';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as Organisms from 'Atomic/Organisms';

import editorState from '../helpers/editorState';
import dndState from '../dnd/state';
import dndHandler from '../dnd/handler';
import EditorWrap from '../components/Wrappers/EditorWrap';
// import Eraser from '../components/Eraser';

const { func, bool } = PropTypes;
const Cursor = List([]); // eslint-disable-line new-cap

export default () =>
compose(
  editorState,
  // Create initial cursor,
  // Cursor must will be expanded in each level
  defaultProps({ Cursor }),

  // We allow to drag&drop organisms inside editor
  // Also we dont  fire commit of changes, because its own state
  dndState('organisms', 'data', false),

  withHandlers({
    updateEditorState: props => (key, state) => {
      const mutation = props.organisms.setIn(key, state);
      props.update(mutation);
    },
  }),

  withContext({ updateEditorState: func }, ({ updateEditorState }) => ({ updateEditorState })),

  // We map organisns to to components
  withProps(({ move, add, hover, remove, hoverIndex, ...props }) => ({
    children: props.organisms.map((organism, index) =>
      createEagerElement(
        Organisms[organism.get('type')].Component,
        {
          key: organism.get('id'),
          index,
          organism,
          settings: organism.has('settings') && organism.get('settings') || Map({}),
          Cursor: props.Cursor.push(index),
          move, add, hover, remove, hoverIndex
        }
      )
    ),
  })),

  // EditorState from [dndState] and updater
  // Updater recieve an array of nesting and mutation
  withHandlers({
    export: props => () => {
      const Component = compose(
        withEditorContext,
        withContext({ editorDisabled: bool }, () => ({ editorDisabled: true })),
        // DragDropContext(HTML5Backend), // eslint-disable-line new-cap
        withProps(ownProps => ({
          ...props,
          ...ownProps,
          pure: true
        })),
      )(EditorWrap);
      console.log(renderToStaticMarkup(<Component />));
    }
  }),

  dndHandler('template'),

)(EditorWrap);
