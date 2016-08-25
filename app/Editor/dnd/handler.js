import { PropTypes } from 'react';
import { flowRight, compact } from 'lodash';
import { compose, branch, renderComponent, createEagerFactory, getContext, withHandlers, withProps } from 'recompose';
import { DropTarget as dropTarget, DragSource as dragSource } from 'react-dnd';
import { Motion } from 'react-motion';
import Animation from '../immutable/animation';

import * as targetSpec from './dragTarget';
import * as sourceSpec from './dragSource';
import * as spec from './spec';

const identity = t => t;

const getMotionStyle = (isDragging, canDrop, index, hoverIndex, cursor, dragingItem) => {
  const monitor = dragingItem;
  const height = monitor.get('height');
  const animation = new Animation();

  if (isDragging) {
    return animation.animate('opacity', 0).run;
  }

  if (monitor.isDragging && canDrop) {
    if (monitor.isMounted) {
      if (monitor.originalIndex < index && hoverIndex > index) {
        return animation.animate('y', -height).run;
      }
      if (monitor.originalIndex > index && hoverIndex <= index) {
        return animation.animate('y', height).run;
      }
    } else {
      if (hoverIndex <= index) {
        return animation.animate('y', height).run;
      }
    }
  }

  return animation.animate('y', 0, false).run;
};

const getStyles = ({ scale, y, ...rest }) => ({
  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
  overflow: 'visible',
  position: 'relative',
  ...rest
});

export const Handler = (type, baseType) => baseComponent => {
  const factory = createEagerFactory(baseComponent);
  const source = baseType || spec[type].source;
  const target = spec[type].target;

  const dndDecorators = compact([
    getContext({
      drag: PropTypes.func,
      drop: PropTypes.func,
      dragingItem: PropTypes.object,
      editingItem: PropTypes.object
    }),

    withProps(props => ({
      canDrag: !props.editingItem.canDrag,
      isActive: props.Cursor
        && props.editingItem.isContentEditing
        && props.Cursor.equals(props.editingItem.Cursor)
    })),

    target && dropTarget(target, targetSpec[type], (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })),

    // We allow to sort organisms my drag and drop
    source && dragSource(source, sourceSpec[type], (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag()
    })),

    withHandlers({
      drag: props => e => {
        const { height } = e.target.getBoundingClientRect();
        const { index, Cursor: cursor } = props;
        props.drag({ height, index, cursor });
      }
    }),

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
    isActive,
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
      <div
        onDragStart={drag}
        onDragEnd={drop}
        style={{ position: 'relative', zIndex: isActive ? 3 : 2 }}>
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

export const Raw = BaseComponent => props => <BaseComponent {...props} />;

export default (...data) =>
compose(
  getContext({
    editorDisabled: PropTypes.bool
  }),
  branch(
    props => !!props.editorDisabled,
    identity,
    Handler(...data),
  )
);
