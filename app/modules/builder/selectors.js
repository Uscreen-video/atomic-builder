import { createSelector } from 'reselect';

export default createSelector(
  s => s.builder,
  molecules => ({ blocks: molecules })
);
