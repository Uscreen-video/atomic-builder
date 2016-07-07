import createPreview from './creators/createPreview';
import createOrganism from './creators/createOrganism';

export default data => ({
  Preview: createPreview('organism', data),
  Component: createOrganism(data)
});
