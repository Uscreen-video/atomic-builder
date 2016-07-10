import { shouldUpdate } from 'recompose';

export default key => shouldUpdate((prev, next) => {
  return !prev.Cursor.equals(next.Cursor)
});
