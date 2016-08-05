import { PropTypes } from 'react';
import { flowRight, compact } from 'lodash';
import { createEagerFactory, getContext, withHandlers } from 'recompose';
import { DropTarget as dropTarget, DragSource as dragSource } from 'react-dnd';
import { Motion, spring } from 'react-motion';

import * as targetSpec from './dragTarget';
import * as sourceSpec from './dragSource';
import * as spec from './spec';

const springConfig = { stiffness: 300, damping: 50 };

const defaultMotions = {
  scale: spring(1, springConfig),
  y: spring(0, springConfig),
  opacity: spring(1, springConfig)
};

const getMotionStyle = (isDragging, canDrop, index, hoverIndex, cursor, dragingItem) => {
  const monitor = dragingItem;
  const height = monitor.get('height');

  if (isDragging) {
    return {
      ...defaultMotions,
      opacity: spring(0, springConfig)
    };
  }

  if (monitor.isDragging && canDrop) {
    if (monitor.isMounted) {
      if (monitor.originalIndex < index && hoverIndex > index) {
        return {
          ...defaultMotions,
          y: spring(height * -1, springConfig)
        };
      }
      if (monitor.originalIndex > index && hoverIndex <= index) {
        return {
          ...defaultMotions,
          y: spring(height, springConfig)
        };
      }
    } else {
      if (hoverIndex <= index) {
        return {
          ...defaultMotions,
          y: spring(height, springConfig)
        };
      }
    }
  }

  if (!monitor.isDragging) {
    return {
      ...defaultMotions,
      y: 0
    };
  }
  return defaultMotions;
};

const getStyles = ({ scale, y, ...rest }) => ({
  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
  overflow: 'visible',
  position: 'relative',
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
      dragingItem: PropTypes.object
    }),

    target && dropTarget(target, targetSpec[type], (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })),

    // We allow to sort organisms my drag and drop
    source && dragSource(source, sourceSpec[type], (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })),

    withHandlers({
      drag: props => e => {
        const { height } = e.target.getBoundingClientRect();
        const { index, Cursor: cursor } = props;
        props.drag({ height, index, cursor });
      }
    })
  ]);

  return flowRight(dndDecorators)(({
    connectDropTarget,
    connectDragSource,
    isDragging,
    dragingItem,
    hoverIndex,
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

    const motion = getMotionStyle(isDragging, canDrop, index, hoverIndex, rest.Cursor, dragingItem);
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
