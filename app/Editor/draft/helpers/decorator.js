import { Entity, CompositeDecorator } from 'draft-js';
import findEntity from './findEntity';

const Link = ({ children, entityKey }) => {
  const url = Entity.get(entityKey).getData();
  return <a href={url} title={url}>{children}</a>;
};

const Color = ({ children, entityKey }) => {
  const color = Entity.get(entityKey).getData();
  return <span style={{ color }}>{children}</span>;
};

export default new CompositeDecorator([
  {
    strategy: findEntity('LINK'),
    component: Link
  },
  {
    strategy: findEntity('COLOR'),
    component: Color
  }
]);
