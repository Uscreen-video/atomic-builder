import { compose, withProps, withHandlers } from 'recompose';
import cx from 'classnames';
import Ink from 'react-ink';
import Icon from 'Editor/components/Icon';

import styles from './styles.css';


export default compose(
  withProps(props => ({
    type: 'button',
    className: styles.button
  })),
  withHandlers({
    onClick: props => props.onChange
  })
)(({ icon, active, color, ...rest }) => (
  <li className={cx(styles.item, active && styles.active)}>
    <button {...rest}>
      {
        !!icon
        && <Icon value={icon} fill={color} className={styles.icon} />
      }
      <Ink />
    </button>
  </li>
));
