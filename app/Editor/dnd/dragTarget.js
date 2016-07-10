import { getPosition } from './helpers';

export const block = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    if (props.index === item.index) return;
    const position = getPosition(props, monitor, component);
    props.updateHoverPosition(position);
  },
  canDrop(props, monitor) {
    return props.index !== monitor.getItem().index;
  }
};

export const placeholder = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (monitor.getItemType() === 'preview') {
      props.addBlock(props.index, item);
    } else {
      props.moveBlock(props.index, item.index);
    }
    return;
  }
};

export const eraser = {
  drop(props, monitor) {
    const { index, removeBlock } = monitor.getItem();
    removeBlock(index);
  }
};

export const template = {
  drop(props, monitor) {
    props.add(0, monitor.getItem().props);
  },
  canDrop(props) {
    return !props.organisms.size;
  }
};

export const atom = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const position = getPosition(props, monitor, component);
    return;
  },
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const position = getPosition(props, monitor, component);
    if (item.isPreview) {
      props.add(position, item.props);
    } else if (position !== props.index) {
      props.move(position, props.index);
    }
    return;
  },
  canDrop(props, monitor) {
    const item = monitor.getItem()
    return item.isPreview ? true : props.index !== item.index;
  }
};

export const organism = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const position = getPosition(props, monitor, component);
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
    return props.index !== monitor.getItem().index;
  }
};

export const molecule = {
  drop(props, monitor) {
    props.add(0, monitor.getItem().props);
  },
  canDrop(props) {
    return !props.atoms.size;
  }
};
