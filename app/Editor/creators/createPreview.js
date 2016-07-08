import { compose, withProps, getContext, setDisplayName } from 'recompose';
import { DragSource as source } from 'react-dnd';
import { PropTypes } from 'react';
import { fromJS } from 'immutable';

import Preview from '../components/EditorPreview';
import { preview as sourceSpec } from '../dnd/dragSource';

export default (type, { preview, props }) =>
compose(
  setDisplayName(`Preview:${type}:${props.type}`),

  getContext({ drag: PropTypes.func, drop: PropTypes.func }),

  withProps(({ drag, drop }) => ({
    src: preview,
    props: fromJS(props),
    drag,
    drop
  })),

  source(type, sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Preview);
