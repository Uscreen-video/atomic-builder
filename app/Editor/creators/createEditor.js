import {
  compose, withReducer, withHandlers,
  withPropsOnChange, createEagerElement, setDisplayName
} from 'recompose';
import { DropTarget as target } from 'react-dnd';
import { fromJS } from 'immutable';
import withActions from '../dnd/actions';

import * as organisms from 'Atomic/Organisms';

import { template as targetSpec } from '../dnd/dragTarget';
import EditorWrap from '../components/EditorWrap';


export default () =>
compose(
  setDisplayName('Editor'),

  withActions('organisms', 'data'),

  withPropsOnChange(['organisms'], props => ({
    children: props.organisms.map((organism, index) =>
      createEagerElement(
        organisms[organism.get('type')].Component,
        { key: index, organism }
      )
    )
  })),

  target('organism', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(EditorWrap);
