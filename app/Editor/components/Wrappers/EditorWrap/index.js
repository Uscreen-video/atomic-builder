import { PropTypes } from 'react';
import cx from 'classnames';
import { compose, getContext } from 'recompose';
import editorState from 'Editor/helpers/editorState';
import BlankState from './BlankState';
import Eraser from '../../Eraser';
import PagePreview from '../../PagePreview';
import EditorSidebar from '../../EditorSidebar';
import styles from './styles.css';

const { object, func } = PropTypes;

export default compose(
  editorState,
  getContext({ dragingItem: object, drop: func })
)(({
  editingItem,
  organisms,
  children,
  isOver,
  drop,
  dragingItem
}) => {
  return (
    <div>
      <div className={cx(styles.wrap, editingItem.isSidebarOpen && styles.wrap_shifted)}>
        {
          !organisms.size
          && <BlankState isOver={isOver} />
          || children
        }
      </div>
      {
        isOver && <PagePreview />
      }
      {
        editingItem.isSidebarOpen
        && <EditorSidebar organisms={organisms} editingItem={editingItem} />
      }
      {
        dragingItem.isDragging && <Eraser drop={drop} />
      }
    </div>
  );
});
