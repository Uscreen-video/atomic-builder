import styles from './styles.css';

export default ({
  src,
  props: { type }
}) => <img src={src} alt={type} />;
