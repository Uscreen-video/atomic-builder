import styles from './styles.css';

export default ({ isOver }) => (
  <div className={styles.BlankState}>
    {
      isOver &&
      <div className={styles.content}>
        <h3>Now drop it</h3>
      </div>
    }
    {
      !isOver &&
        <div className={styles.content}>
          <h3>Drop something here</h3>
          <p>It could be Template or Organism</p>
        </div>
    }
  </div>
);
