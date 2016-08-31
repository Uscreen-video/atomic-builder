import createPreview from 'Editor/creators/createPreview';
import { fromJS } from 'immutable';
export default {
  Preview: createPreview('organism', {
    preview: require('../../Organisms/type1/preview.png'), 
    data: fromJS(require('./state.json'))
  })
};