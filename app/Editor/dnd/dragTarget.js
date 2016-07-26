import { getPosition } from './helpers';

export const template = {
  drop(props, monitor) {
    if (!monitor.isOver()) return;
    if (!props.organisms.size) {
      props.add(0, monitor.getItem().props);
    } else {
      props.append(monitor.getItem().props);
    }
    return;
  },

  canDrop(_, monitor) {
    if (monitor.getItem().type !== 'organism') return false;
    return true;
  }
};

export const atom = {
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
    props.hover(void 0);
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
  hover(){
    console.log('atom is over');
  },

  drop(props, monitor) {
    if (!monitor.isOver()) return;
    if (!props.atoms.size) {
      console.log('new props', monitor.getItem());
      props.add(0, monitor.getItem().props);
    } else {
      console.log('props', props);
      monitor.getItem().append(props);
    }
    return;
  },
  canDrop(props, monitor) {
    return true;
  }
};
