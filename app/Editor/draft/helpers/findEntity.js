import { Entity } from 'draft-js';

export default key => (contentBlock, callback) =>
contentBlock.findEntityRanges(
  (character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      Entity.get(entityKey).getType() === key
    );
  },
  callback
);
