import styles from './styles.css';
import cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('active', 'setActive', false),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    }
  })
)(({
  active,
  className,
  title,
  onClick
}) => (
  <div>
    <button
      className={cx(className, active && styles.title_active)}
      onClick={onClick}>
      {title}
      <i className='edit-icon'>
        <svg width="528" height="528" viewBox="0 0 528 528"><path d="M328.883 89.125l107.59 107.59-272.34 272.34-107.53-107.59 272.28-272.34zm189.23-25.948l-47.98-47.98c-18.544-18.544-48.654-18.544-67.26 0l-45.96 45.96 107.59 107.59 53.61-53.61c14.382-14.384 14.382-37.578 0-51.96zM.3 512.69c-1.958 8.812 5.998 16.708 14.81 14.565l119.892-29.07-107.53-107.588L.3 512.69z" /></svg>
      </i>
    </button>
    <div className={cx(styles.modalWindow, active && styles.modalWindow_active)}>
      <ul><li>Change styles</li><li>Animate</li><li>Add a link</li><li>Settings</li></ul>
    </div>
  </div>
));
