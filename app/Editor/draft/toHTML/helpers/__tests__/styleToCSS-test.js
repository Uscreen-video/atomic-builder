/* @flow */

let {describe, it} = global;

import styleToCSS from '../styleToCSS';
import expect from 'expect';

describe('styleToCSS', () => {
  it('should accept an empty set of rules', () => {
    expect(styleToCSS({})).toBe('');
  });

  it('should stringify a single rule', () => {
    expect(styleToCSS({color: 'red'})).toBe('color: red');
  });

  it('should stringify multiple rules', () => {
    let styles = {
      color: 'red',
      padding: '2px',
    };
    expect(styleToCSS(styles)).toBe(
      'color: red; padding: 2px'
    );
  });

  it('should convert camelCase to hyphenated', () => {
    let styles = {
      fontWeight: 'bold',
      msGridColumn: 'auto',
      webkitAppearance: 'none',
    };
    expect(styleToCSS(styles)).toBe(
      'font-weight: bold; -ms-grid-column: auto; -webkit-appearance: none'
    );
  });

  it('should add units on certain rules', () => {
    let styles = {
      lineHeight: 1,
      fontSize: 12,
    };
    expect(styleToCSS(styles)).toBe(
      'line-height: 1; font-size: 12px'
    );
  });
});
