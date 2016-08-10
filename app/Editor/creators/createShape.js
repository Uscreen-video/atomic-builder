import { Record } from 'immutable';

class Shape extends Record({ // eslint-disable-line new-cap
})
{
  color(value, extendObject) {
    return  {
      type: 'color',
      description: 'Some description',
      title: '',
      value,
      ...extendObject
    };
  }
}

export const shape = new Shape;
