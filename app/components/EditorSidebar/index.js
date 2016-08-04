import { compose, withState, withHandlers } from 'recompose';
import cx from 'classnames';

import editorState from 'Editor/helpers/editorState';

import styles from './styles.css';

export default compose(
  editorState,
  withHandlers({
    mouseLeave: props => e => {
      e.stopPropagation();
      props.releaseItem();
    }
  })
)(({
  editingItem,
  mouseLeave
}) => (
  <div
    className={cx(styles.sidebar, editingItem.active && styles.sidebar_active)}
    onMouseLeave={mouseLeave}
  >
    <h2 className={styles.sidebar__header}>Settings for {editingItem.type}</h2>
    <ul>
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
      <li>item4</li>
    </ul>
  </div>
));
