import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import createHelper from 'recompose/createHelper';

const EVENTS = ['mousedown', 'touchstart'];
const isNodeFound = (current, componentNode) => current === componentNode;

const createClickHandler = callback => (componentNode, props) => e => {
  let current = e.target;

  while (current.parentNode) {
    if (isNodeFound(current, componentNode)) return;
    current = current.parentNode;
  }

  if (current !== document) return;
  callback(props);
};

const onClickOutside = handler => BaseComponent => {
  const handlerCreator = createClickHandler(handler);
  let fn = void 0;

  return class HandleComponent extends Component {
    componentDidMount() {
      fn = handlerCreator(findDOMNode(this.instance), this.props);
      if (typeof document !== 'undefined') {
        EVENTS.forEach(eventName => document.addEventListener(eventName, fn));
      }
    }

    componentWillUnmount() {
      if (typeof document !== 'undefined') {
        EVENTS.forEach(eventName => document.removeEventListener(eventName, fn));
        fn = void 0;
      }
    }

    render() {
      return <BaseComponent {...this.props} ref={r => this.instance = r} />;
    }
  };
};

export default createHelper(onClickOutside, 'onClickOutside');
