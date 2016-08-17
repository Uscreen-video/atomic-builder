import { Record } from 'immutable';

class Monitor extends Record({ // eslint-disable-line new-cap
  originalIndex: void 0,
  hoverIndex: void 0,
  cursor: void 0,
  isMounted: void 0,
  dragging: false,
  height: 0
})
{
  init({ height, index, cursor }) {
    return this
    .set('height', height)
    .set('originalIndex', index)
    .set('cursor', cursor)
    .set('dragging', true);
  }

  hover(index) {
    return this
    .set('hoverIndex', index);
  }

  reset() {
    return this.set('dragging', false);
  }

  get isMounted() {
    return this.get('originalIndex') !== void 0;
  }

  get isDragging() {
    return this.get('dragging');
  }
}

export default new Monitor();
