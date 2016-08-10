import styles from './styles.css';
import Customizer from '../Customizer/';

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
  <Customizer
    {...props}
    title='Molecule'
    outside
  >
    <Placeholder {...props} />
    <Molecule {...props} />
  </Customizer>
);
