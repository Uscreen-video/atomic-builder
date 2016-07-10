import {
  compose, withContext, defaultProps, withProps,
  withPropsOnChange, createEagerElement, setDisplayName
} from 'recompose';
import { DropTarget as target } from 'react-dnd';
import { PropTypes } from 'react';
import { List } from 'immutable';
import dndState from '../helpers/dndState';
import * as organisms from 'Atomic/Organisms';
import { template as targetSpec } from '../dnd/dragTarget';
import EditorWrap from '../components/EditorWrap';

const { object, func } = PropTypes;

export default () =>
compose(
  setDisplayName('Editor'),
  defaultProps({ Cursor: List([]) }),

  dndState('organisms', 'data', false),

  withContext({ updateEditorState: func }, props => ({
    updateEditorState: (key, state) => props.update(props.organisms.setIn(key, state))
  })),

  withPropsOnChange(['organisms'], props => ({
    organisms: props.organisms.map((organism, index) =>
      createEagerElement(
        organisms[organism.get('type')].Component,
        { key: index, index, organism, Cursor: props.Cursor.push(index) }
      )
    )
  })),

  target('organism', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(EditorWrap);
