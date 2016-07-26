import Highlight from '../Highlight/';
import styles from './styles.css';

export default ({
  Atom,
  activate,
  deactivate,
  isDragging,
  ...props
}) => (
  <div onClick={!props.active && !isDragging && activate}>
    <Highlight title='atom' outside>
      <Atom {...props} />
    </Highlight>
    {
      props.active &&
        <button className={styles.button} onClick={deactivate}>Save changes</button>
    }
  </div>
);
