export const atom = {
  beginDrag({ index, props, Cursor, remove, ...rest }) {
    return {
      index,
      Cursor,
      remove, // Add posiability to remove atom thought atom
      props: props || rest.atom.set('content', rest.content),
      type: 'atom'
    };
  },
  canDrag({ editingItem }) {
    return !editingItem;
  }
};

export const organism = {
  beginDrag({ index, props, Cursor }) {
    return {
      index,
      props,
      Cursor,
      type: 'organism'
    };
  }
};

export const preview = {
  beginDrag({ props, type }) {
    return ({ props, isPreview: true, type });
  }
};
