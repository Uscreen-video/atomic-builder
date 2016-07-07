export const block = {
  beginDrag({ index, setDragging, removeBlock }) {
    setDragging(true);
    return { index, removeBlock };
  },
  endDrag({ setDragging }) {
    setDragging(false);
  }
};

export const preview = {
  beginDrag({ drag, props, name }) {
    drag(props)
    return ({ props, name });
  },
  endDrag({ drop }) {
    drop(false);
  }
};
