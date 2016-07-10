import { shouldUpdate } from 'recompose';

export default shouldUpdate((prev, next) => prev.get('settings') !== next.get('settings'));
