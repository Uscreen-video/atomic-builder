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

  return class HandleComponent extends Component {
    fn = void 0;
    componentDidMount() {
      this.fn = handlerCreator(findDOMNode(this.instance), this.props);
      if (typeof document !== 'undefined') {
        EVENTS.forEach(eventName => document.addEventListener(eventName, this.fn));
      }
    }

    componentWillUnmount() {
      if (typeof document !== 'undefined') {
        EVENTS.forEach(eventName => document.removeEventListener(eventName, this.fn));
        this.fn = void 0;
      }
    }

    render() {
      return (
        <div ref={r => this.instance = r}>
          <BaseComponent {...this.props} />
        </div>
      );
    }
  };
};

export default createHelper(onClickOutside, 'onClickOutside');
