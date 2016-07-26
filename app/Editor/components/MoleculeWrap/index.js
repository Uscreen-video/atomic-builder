import styles from './styles.css';
import Highlight from '../Highlight/';

const Placeholder = ({ atoms }) => !atoms.size && (
  <div className={styles.placeholder}>
    <div className={styles.placeholderBorder} />
    Drop atoms here
  </div>
);

export default ({
  Molecule,
  ...props
}) => (
  <Highlight title='Molecule' outside>
    <Placeholder {...props} />
    <Molecule {...props} />
  </Highlight>
);
