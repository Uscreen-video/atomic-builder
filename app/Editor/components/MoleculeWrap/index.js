import styles from './styles.css';
import cx from 'classnames';
import Highlight from '../Highlight/';

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
      <Highlight title='Molecule' outside>
        <Placeholder {...props} />
        <Molecule {...props} />
      </Highlight>
    </div>
  );
}
