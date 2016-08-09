import styles from './styles.css';
import BlankState from './BlankState';
import EditorSidebar from '../../../components/EditorSidebar';

export default ({
  organisms,
  children,
  isOver
}) => (
  <div>
    <div className={styles.wrap}>
      {
        !organisms.size
        && <BlankState isOver={isOver} />
        || children
      }
    </div>
    <EditorSidebar />
  </div>
);
