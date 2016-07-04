import { createSelector } from 'reselect';

export default createSelector(
  s => s.builder,
  ({ keys, ...layouts }) => ({ keys, layouts })
);
