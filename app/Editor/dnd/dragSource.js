export const atom = {
  beginDrag({ index, drag, props }) {
    // drag(props);
    return { index, props };
  },
  endDrag({ drop }) {
    // drop(false);
  }
};


export const organism = {
  beginDrag({ index, drag, props }) {
    // drag(props);
    return { index, props };
  },
  endDrag({ drop }) {
    // drop(false);
  }
};

export const preview = {
  beginDrag({ drag, props }) {
    drag(props);
    return ({ props, isPreview: true });
  },
  endDrag({ drop }) {
    drop(false);
  }
};
