import { compose, mapProps, getContext } from 'recompose';
import { DragSource as source } from 'react-dnd';
import { PropTypes } from 'react';
import { fromJS } from 'immutable';

import Preview from '../components/EditorPreview';
import { preview as sourceSpec } from '../dnd/dragSource';

export default (type, { preview, props }) =>
compose(

  // Notify editor if we draging something
  getContext({ drag: PropTypes.func, drop: PropTypes.func }),

  // Props to render component and actions to file in dnd
  mapProps(({ drag, drop }) => ({ src: preview, props: fromJS(props), drag, drop })),

  // We allow to drag preview, after it droped we pass props to create element
  source(type, sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Preview);
