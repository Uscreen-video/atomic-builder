export const atom = {
  beginDrag({ index, Cursor, remove, settings, content, ...rest }) {
    return {
      index,
      Cursor,
      remove, // Add posiability to remove atom thought atom
      props: rest.atom.set('content', content).set('settings', settings),
      type: 'atom'
    };
  },
  canDrag(props) {
    console.log(props.canDrag);
    return props.canDrag;
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
  },
  canDrag(props) {
    return props.canDrag;
  }
};

export const preview = {
  beginDrag({ props, type }) {
    return ({ props, isPreview: true, type });
  }
};
