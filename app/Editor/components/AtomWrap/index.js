import Customizer from '../Customizer/';
import styles from './styles.css';

export default ({
  Atom,
  activate,
  deactivate,
  isDragging,
  ...props
}) => (
  <div onClick={!props.active && !isDragging && activate}>
    <Customizer title='atom' outside>
      <Atom {...props} />
    </Customizer>
    {
      props.active &&
        <button className={styles.button} onClick={deactivate}>Save changes</button>
    }
  </div>
);
