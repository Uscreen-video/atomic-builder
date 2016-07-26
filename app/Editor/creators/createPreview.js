import { compose, mapProps, getContext } from 'recompose';
import { PropTypes } from 'react';
import { fromJS } from 'immutable';

import Preview from '../components/EditorPreview';
import dndHandler from '../dnd/handler';

export default (type, { preview, props }) =>
compose(

  // Notify editor if we draging something
  getContext({ drag: PropTypes.func, drop: PropTypes.func }),

  // Props to render component and actions to file in dnd
  mapProps(({ drag, drop }) => ({ src: preview, props: fromJS(props), drag, drop, type })),

  // We allow to drag preview, after it droped we pass props to create element
  dndHandler('preview', type)
)(Preview);
