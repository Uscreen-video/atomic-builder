/* @flow */

let {describe, it} = global;

import normalizeAttributes from '../normalizeAttributes';
import expect from 'expect';

describe('normalizeAttributes', () => {
  it('should not do anything with an empty set of attributes', () => {
    let attributes = {};
    let normalized = normalizeAttributes(attributes);
    expect(normalized).toBe(attributes);
    expect(normalized).toEqual({});
  });

  it('should not do anything if no attributes need to be normalized', () => {
    let attributes = {id: 'foo', class: 'bar'};
    let normalized = normalizeAttributes(attributes);
    expect(normalized).toBe(attributes);
    expect(normalized).toEqual({id: 'foo', class: 'bar'});
  });

  it('should normalize attributes without mutating', () => {
    let attributes = {id: 'foo', className: 'bar'};
    let normalized = normalizeAttributes(attributes);
    expect(attributes).toEqual({id: 'foo', className: 'bar'});
    expect(normalized).toEqual({id: 'foo', class: 'bar'});
  });
});
