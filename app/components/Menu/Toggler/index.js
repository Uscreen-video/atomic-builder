import Icon from 'Editor/components/Icon';
import cx from 'classnames';

import styles from './styles.css';

export default ({
  onClick,
  active
}) => (
  <button className={cx(styles.toogler, active && styles.active)} onClick={onClick}>
    <Icon value='cross' />
  </button>
);
