import { PropTypes } from 'react';
import { compose, getContext, withState, withHandlers } from 'recompose';
import cx from 'classnames';
const { func, bool, object } = PropTypes;

import editorState from 'Editor/helpers/editorState';
import ColorPicker from 'Editor/components/ColorPicker';


import styles from './styles.css';

export default compose(
  editorState,
  withHandlers({
    mouseLeave: props => e => {
      e.stopPropagation();
      props.releaseItem();
    },
    setSettings: props => data => {
      const cursor = props.editingItem.Cursor.push('backgroundColor');
      props.updateEditorState(cursor, data);
    }
  })
)(({
  editingItem,
  mouseLeave,
  setSettings
}) => (
  <div
    className={cx(styles.sidebar, editingItem.active && styles.sidebar_active)}
    onMouseLeave={mouseLeave}
  >
    <h2 className={styles.sidebar__header}>Settings for {editingItem.type}</h2>
    <ul>
      <li>
        <ColorPicker setSettings={setSettings} color='#1343bd' label='Background color:' />
      </li>
      <li>item2</li>
      <li>item3</li>
      <li>item4</li>
    </ul>
  </div>
));
