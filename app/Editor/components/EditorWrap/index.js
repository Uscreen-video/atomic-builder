import styles from './styles.css';
import BlankState from './BlankState';

export default ({
  organisms,
  children,
  isOver
}) => (
  <div className={styles.wrap}>
    {
      !organisms.size
      && <BlankState isOver={isOver} />
      || children
    }
  </div>
);
