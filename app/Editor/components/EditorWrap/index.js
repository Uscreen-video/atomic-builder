import cx from 'classnames';
import { compose } from 'recompose';
import styles from './styles.css';
import BlankState from './BlankState';
import EditorSidebar from '../../../components/EditorSidebar';
import editorState from 'Editor/helpers/editorState';

export default compose(
  editorState
)(({
  editingItem,
  organisms,
  children,
  isOver
}) => (
  <div>
    <div className={cx(
        styles.wrap,
        editingItem.active && styles.wrap_shifted
    )}>
      {
        !organisms.size
        && <BlankState isOver={isOver} />
        || children
      }
    </div>
    {
      editingItem.active && <EditorSidebar organisms={organisms} />
    }
  </div>
));
