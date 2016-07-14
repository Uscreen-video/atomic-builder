import styles from './styles.css';
import cx from 'classnames';
import Icon from 'Editor/components/Icon';

function prevent(e) {
  e.preventDefault();
}

export default ({ children, active, onCancel }) => (
  <div className={cx(styles.overlay, active && styles.active)}>
    <button className={styles.backIcon} onClick={onCancel} onMouseDown={prevent}>
      <Icon value='chevron_left' />
    </button>
    <div className={styles.overlayContent}>
      {children}
    </div>
  </div>
);
