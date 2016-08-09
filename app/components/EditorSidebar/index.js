import { PropTypes } from 'react';
import { compose, getContext, withState, withHandlers } from 'recompose';
import cx from 'classnames';
const { func, bool, object } = PropTypes;

import editorState from 'Editor/helpers/editorState';
import ColorPicker from 'Editor/components/ColorPicker';
import BoxSpacing from 'Editor/components/BoxSpacing';

import styles from './styles.css';

export default compose(
  editorState,
  withHandlers({
    mouseLeave: props => e => {
      e.stopPropagation();
      props.releaseItem();
    },
    setSettings: props => (key, value) => {
      const cursor = props.editingItem.Cursor.push(key);
      props.updateEditorState(cursor, value);
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
      <li>
        <BoxSpacing label='Paddings:' />
      </li>
    </ul>
  </div>
));
