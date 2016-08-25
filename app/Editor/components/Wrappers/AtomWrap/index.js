import Customizer from '../../Customizer/';

export default ({
  Atom,
  activate,
  connectDragPreview,
  isDragging,
  ...props
}) => {
  return (
    <div onClick={!props.active && !isDragging && activate}>
      <Customizer
        {...props}
        title='atom'
        outside
        isDragging={isDragging}
        preview={connectDragPreview}>
        <Atom {...props} />
      </Customizer>
    </div>
  );
}
