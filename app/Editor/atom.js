import createPreview from './creators/createPreview';
import createAtom from './creators/createAtom';

export default data => ({
  Preview: createPreview('atom', data),
  Component: createAtom(data)
});
