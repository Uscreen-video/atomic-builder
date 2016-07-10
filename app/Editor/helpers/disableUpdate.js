import { shouldUpdate } from 'recompose';

export default key => shouldUpdate((prev, next) =>
  prev[key].get('settings') !== next[key].get('settings')
);
