import styles from './styles.css';

export default ({
  connectDragSource,
  src,
  props
}) => connectDragSource(
  <div>
    <img src={src} alt={props.type} />
  </div>
);
