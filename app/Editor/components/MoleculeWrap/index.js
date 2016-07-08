import styles from './styles.css';
import cx from 'classnames';

const Placeholder = ({ atoms }) => !atoms.size && (
  <div className={styles.placeholder}>
    <div className={styles.placeholderBorder} />
    Drop atoms here
  </div>
);

export default ({
  Molecule,
  connectDropTarget,
  ...props
}) => {
  return connectDropTarget(
    <div className={cx(styles.wrap)}>
      <Placeholder {...props} />
      <Molecule {...props} />
    </div>
  );
}
