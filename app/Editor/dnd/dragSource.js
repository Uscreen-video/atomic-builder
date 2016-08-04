export const atom = {
  beginDrag({ index, props, ...rest }) {
    return { index, props: props || rest.atom.set('content', rest.content), type: 'atom' };
  },
  canDrag({ editingItem }) {
    return { ...editingItem, active: !editingItem.active };
  }
};

export const organism = {
  beginDrag({ index, props }) {
    return { index, props, type: 'organism' };
  }
};

export const preview = {
  beginDrag({ props, type }) {
    return ({ props, isPreview: true, type });
  }
};
