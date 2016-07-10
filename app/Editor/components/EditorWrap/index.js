import { cloneElement } from 'react';
import cx from 'classnames';

import styles from './styles.css';
import BlankState from './BlankState';

export default ({
  connectDropTarget,
  organisms,
  children,
  isOver
}) => connectDropTarget(
  <div className={styles.wrap}>
    {
      !organisms.size
      && <BlankState isOver={isOver} />
      || children
    }
  </div>
);
