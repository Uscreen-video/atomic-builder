import { PropTypes } from 'react';
import cx from 'classnames';
import { compose, getContext, withState, lifecycle } from 'recompose';
import styles from './styles.css';
import BlankState from './BlankState';
import EditorSidebar from '../EditorSidebar';
import Eraser from '../Eraser';
import editorState from 'Editor/helpers/editorState';

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
    <div className={cx(styles.wrap, editingItem.active && styles.wrap_shifted)}>
      {
        !organisms.size
        && <BlankState isOver={isOver} />
        || children
      }
    </div>
    {
      editingItem.isSidebarOpen && <EditorSidebar organisms={organisms} editingItem={editingItem} />
    }
    {
      dragingItem.isDragging && <Eraser drop={drop} />
    }
  </div>
);
}
);
