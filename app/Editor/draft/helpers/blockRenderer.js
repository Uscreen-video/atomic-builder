import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const blockRenderMap = Map({
  paragraph: {
    element: 'p'
  },
  unstyled: {
    element: 'p'
  }
});

export default DefaultDraftBlockRenderMap.merge(blockRenderMap);
