import Highlight from '../Highlight/';
import styles from './styles.css';

export default ({
  Atom,
  activate,
  connectDragPreview,
  isDragging,
  ...props
}) => (
  <div onClick={!props.active && !isDragging && activate}>
    <Highlight title='atom' outside preview={connectDragPreview}>
      <Atom {...props} />
    </Highlight>
  </div>
);
