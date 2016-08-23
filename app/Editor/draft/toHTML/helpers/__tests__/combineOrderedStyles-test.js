/* @flow */

let {describe, it} = global;

import combineOrderedStyles from '../combineOrderedStyles';
import expect from 'expect';

describe('combineOrderedStyles', () => {
  it('should return defaults when customStyleMap is null', () => {
    let defaultStyleMap = {};
    let defaultStyleOrder = [];
    let defaults = [defaultStyleMap, defaultStyleOrder];
    let result = combineOrderedStyles(null, defaults);
    expect(result).toBe(defaults);
    expect(result).toEqual([{}, []]);
  });

  it('should return copies of defaults when customStyleMap is empty', () => {
    let defaultStyleMap = {foo: {}, bar: {}};
    let defaultStyleOrder = ['foo', 'bar'];
    let customStyleMap = {};
    let [styleMap, styleOrder] = combineOrderedStyles(customStyleMap, [defaultStyleMap, defaultStyleOrder]);
    expect(styleMap).toEqual({foo: {}, bar: {}});
    expect(styleMap).toNotBe(defaultStyleMap);
    expect(styleOrder).toEqual(['foo', 'bar']);
    expect(styleOrder).toNotBe(defaultStyleOrder);
  });

  it('should combine styles and preserve default order', () => {
    let defaultStyleMap = {foo: {}, bar: {}};
    let defaultStyleOrder = ['foo', 'bar'];
    let customStyleMap = {baz: {}};
    let [styleMap, styleOrder] = combineOrderedStyles(customStyleMap, [defaultStyleMap, defaultStyleOrder]);
    expect(styleMap).toEqual({foo: {}, bar: {}, baz: {}});
    expect(styleMap).toNotBe(defaultStyleMap);
    expect(styleMap).toNotBe(customStyleMap);
    expect(styleOrder).toEqual(['foo', 'bar', 'baz']);
    expect(styleOrder).toNotBe(defaultStyleOrder);
  });

  it('should merge individual styles', () => {
    let defaultStyleMap = {
      BOLD: {element: 'strong'},
      ITALIC: {element: 'em'},
    };
    let defaultStyleOrder = ['BOLD', 'ITALIC'];
    let customStyleMap = {
      BOLD: {element: 'span', style: {fontWeight: 'bold'}},
      ITALIC: {style: {textDecoration: 'underline'}},
    };
    let [styleMap, styleOrder] = combineOrderedStyles(customStyleMap, [defaultStyleMap, defaultStyleOrder]);
    expect(styleMap).toEqual({
      BOLD: {element: 'span', style: {fontWeight: 'bold'}},
      ITALIC: {element: 'em', style: {textDecoration: 'underline'}},
    });
    expect(styleMap).toNotBe(defaultStyleMap);
    expect(styleMap).toNotBe(customStyleMap);
    expect(styleOrder).toEqual(['BOLD', 'ITALIC']);
    expect(styleOrder).toNotBe(defaultStyleOrder);
  });
});
