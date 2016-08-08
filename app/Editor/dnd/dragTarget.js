import { getPosition, isNested } from './helpers';

export const template = {
  drop(props, monitor) {
    if (!monitor.isOver()) return;
    const item = monitor.getItem();
    if (!props.organisms.size) {
      props.add(0, item.props);
    } else {
      props.move(item.index, props.organisms.size - 1);
    }
    return;
  },

  canDrop(_, monitor) {
    if (monitor.getItem().type !== 'organism') return false;
    return true;
  }
};

export const atom = {
  hover(props, monitor, component) {
    if (!monitor.isOver()) return;
    const position = getPosition(props, monitor, component);
    if (props.hoverIndex !== position) props.hover(position);
    return;
  },
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const position = getPosition(props, monitor, component);
    if (item.isPreview) {
      props.add(position, item.props);
    } else if (!item.Cursor.pop().equals(props.Cursor.pop())) {
      item.remove(item.index); // remove item from previews molecule;
      props.add(position, item.props);
    } else if (position !== item.index) {
      props.move(position, item.index);
    }
    return;
  },
  canDrop() {
    return true;
  }
};

export const organism = {
  hover(props, monitor, component) {
    if (!monitor.isOver()) return;
    const position = getPosition(props, monitor, component);
    if (props.hoverIndex !== position) props.hover(position);
    return;
  },

  drop(props, monitor, component) {
    const item = monitor.getItem();
    const position = getPosition(props, monitor, component);
    if (item.isPreview) {
      props.add(position, item.props);
    } else if (position !== item.index) {
      props.move(position, item.index);
    }
    return;
  },

  canDrop(props, monitor) {
    if (monitor.getItem().type !== 'organism') return false;
    return monitor.getItem().isPreview || props.index !== monitor.getItem().index;
  }
};

export const molecule = {
  // item = Atom;
  // props = molecule;
  drop(props, monitor) {
    const item = monitor.getItem();
    if (!monitor.isOver()) return;
    if (!item.Cursor) {
      props.add(0, item.props);
    } else {
      // Check if atom is already in this molecule,
      // then move it down
      if (isNested(props.Cursor, item.Cursor)) {
        props.move(item.index, props.atoms.size - 1);

      // Else we apending it and removing from old molecule
      } else {
        item.remove(item.index);
        props.append(item.props);
      }
    }
    return;
  },

  canDrop(props, monitor) {
    if (monitor.getItem().type !== 'atom') return false;
    return true;
  }
};
