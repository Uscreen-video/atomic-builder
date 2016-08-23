import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';
import ColorPicker from '../ColorPicker';

import styles from './styles.css';

export default compose(
  withState('active', 'setActive', false),
  withHandlers({
    onClick: props => e => {
      e.stopPropagation();
      props.setActive(!props.active);
    }
  })
)(({
  label,
  active,
  onClick,
  ...props
}) => (
  <div className={styles.setting}>
    <div className={styles.setting__container}>
      {
        label &&
          <span
            className={styles.setting__label}
            onClick={onClick}>
            {label}
          </span>
      }
      {
        props.color &&
          <div
            className={cx(styles.setting__button)}
            onClick={onClick}>
            <div
              className={styles.setting__placeholder}
              style={{ backgroundColor: props.color }} />
          </div>
      }
    </div>
    {
      active &&
        <div className={styles.setting__component}>
          {
            props.children
          }
        </div>
    }
  </div>
));
