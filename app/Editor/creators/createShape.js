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
}

export const shape = new Shape;
