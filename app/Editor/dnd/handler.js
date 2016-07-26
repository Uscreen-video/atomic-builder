import { PropTypes } from 'react';
import { flowRight, compact } from 'lodash';
import { createEagerFactory, getContext, withProps } from 'recompose';
import { DropTarget as dropTarget, DragSource as dragSource } from 'react-dnd';
import { Motion, spring } from 'react-motion';

import * as targetSpec from './dragTarget';
import * as sourceSpec from './dragSource';
import * as spec from './spec';

const springConfig = { stiffness: 300, damping: 50 };

const defaultMotions = {
  scale: spring(1, springConfig),
  shadow: spring(1, springConfig),
  y: spring(0, springConfig),
  opacity: spring(1, springConfig),
};

const getMotionStyle = (isDragging, dragingItem, canDrop, hoverIndex, index) => {
  if (isDragging) {
    return {
      ...defaultMotions,
      opacity: spring(0, springConfig),
    };
  }
  if (dragingItem && canDrop) {
    if (hoverIndex + 1 > index) {
      return defaultMotions;
    }
    if (hoverIndex === index) {
      return {
        ...defaultMotions,
        y: spring(dragingItem, springConfig)
      };
    }
  }
  return defaultMotions;
};

const getStyles = ({ scale, shadow, y, ...rest }) => ({
  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
  overflow: 'visible',
  ...rest
});

export default (type, baseType) => baseComponent => {
  const factory = createEagerFactory(baseComponent);
  const source = baseType || spec[type].source;
  const target = spec[type].target;

  const dndDecorators = compact([
    getContext({
      drag: PropTypes.func,
      drop: PropTypes.func,
      dragingItem: PropTypes.number
    }),

    target && dropTarget(target, targetSpec[type], (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })),

    // We allow to sort organisms my drag and drop
    source && dragSource(source, sourceSpec[type], (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })),

  ]);

  return flowRight(dndDecorators)(({
    connectDropTarget,
    connectDragSource,
    isDragging,
    hoverIndex,
    dragingItem,
    canDrop,
    index,
    drag,
    drop,
    ...rest
  }) => {
    const Component = factory({ ...rest, isDragging });
    if (!source) {
      return connectDropTarget(
        <div style={{ position: 'relative' }}>{Component}</div>
      );
    }

    if (!target) {
      return connectDragSource(
        <div onDragStart={drag} onDragEnd={drop}>{Component}</div>
      );
    }

    const motion = getMotionStyle(isDragging, dragingItem, canDrop, hoverIndex, index);
    return connectDragSource(connectDropTarget(
      <div onDragStart={drag} onDragEnd={drop}>
        <Motion style={motion}>
          {
            motionStyles =>
              <div style={getStyles(motionStyles)}>
                {Component}
              </div>
          }
        </Motion>
      </div>
    ));
  });
};
