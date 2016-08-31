import { compose, mapProps, getContext } from 'recompose';
import { PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

import Preview from '../components/EditorPreview';
import dndHandler from '../dnd/handler';

export default (type, { preview, props: rawProps, data }) => {
  const props = data ? data : fromJS(rawProps).withMutations(_props => {
    if (_props.has('settings')) {
      const _settings = _props.get('settings');
      const settings = _settings.reduce((acc, obj, key) =>
        acc.set(key, obj.get('value')),
        Map({}));
      _props.set('settings', settings);
    }
  });

  return compose(

    // Notify editor if we draging something
    getContext({ drag: PropTypes.func, drop: PropTypes.func }),

    // Props to render component and actions to file in dnd
    mapProps(({ drag, drop }) => ({ src: preview, props, drag, drop, type })),

    // We allow to drag preview, after it droped we pass props to create element
    dndHandler('preview', type)
  )(Preview);
};
