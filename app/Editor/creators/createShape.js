import { Record } from 'immutable';

class Shape extends Record({ // eslint-disable-line new-cap
})
{
  color(value, extendObject) {
    return {
      type: 'color',
      description: 'Some description',
      title: 'Background color:',
      value,
      ...extendObject
    };
  }
  padding(value, extendObject) {
    return {
      type: 'padding',
      description: 'Some description',
      title: 'Paddings:',
      value,
      ...extendObject
    };
  }
  background(value, extendObject) {
    return {
      type: 'background',
      description: 'Some description',
      title: 'Background image:',
      value,
      ...extendObject
    };
  }
  size(value, extendObject) {
    return {
      type: 'size',
      description: 'Some description',
      title: 'Box size:',
      value,
      ...extendObject
    };
  }
}

export const shape = new Shape;
