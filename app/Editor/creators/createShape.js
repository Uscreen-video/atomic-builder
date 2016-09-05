import { Record } from 'immutable';

class Shape extends Record({ // eslint-disable-line new-cap
})
{
  link(value, extendObject) {
    return {
      type: 'link',
      description: 'Some description',
      title: 'Url:',
      value,
      ...extendObject
    };
  }
  spacing(value, extendObject) {
    return {
      type: 'spacing',
      description: 'Some description',
      title: 'Margins and paddings:',
      value,
      ...extendObject
    };
  }
  background(value, extendObject) {
    return {
      type: 'background',
      description: 'Some description',
      title: 'Background:',
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
  align(value, extendObject) {
    return {
      type: 'align',
      description: 'Some description',
      title: 'Align atoms:',
      value,
      ...extendObject
    };
  }
  border(value, extendObject) {
    return {
      type: 'border',
      description: 'Some description',
      title: 'Border settings:',
      value,
      ...extendObject
    };
  }
  shadow(value, extendObject) {
    return {
      type: 'shadow',
      description: 'Some description',
      title: 'Shadow settings:',
      value,
      ...extendObject
    };
  }
  font(value, extendObject) {
    return {
      type: 'font',
      description: 'Some description',
      title: 'Font settings:',
      value,
      ...extendObject
    };
  }
}

export const shape = new Shape;
