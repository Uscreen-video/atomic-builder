import { findDOMNode } from 'react-dom';

export const getPosition = (props, monitor, component) => {
  let position;
  const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  if (hoverClientY < hoverMiddleY) {
    position = 0;
  }
  if (hoverClientY > hoverMiddleY) {
    position = 1;
  }
  return position;
};
