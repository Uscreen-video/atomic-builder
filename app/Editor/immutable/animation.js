import { Record } from 'immutable';
import { spring } from 'react-motion';

const springConfig = { stiffness: 300, damping: 50 };

export default class Animation extends Record({ // eslint-disable-line new-cap
  scale: spring(1, springConfig),
  y: spring(0, springConfig),
  opacity: spring(1, springConfig)
})
{
  animate(props, value, useConfig = true) {
    return this.set(props, useConfig ? spring(value, springConfig) : value).toJS();
  }
}
