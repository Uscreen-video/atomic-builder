import 'normalize.css/normalize.css';

// import Builder from '../Builder';

import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { Menu } from '../Menu';
import { withEditorContext } from 'Editor/editorContext';
import createEditor from 'Editor/creators/createEditor';
import selector from 'modules/builder/selectors';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styles from './styles.css';
const Editor = createEditor({ edit: true });

export const Root = compose(
  connect(selector),
  withEditorContext,
  DragDropContext(HTML5Backend), // eslint-disable-line new-cap
)(({ blocks, ...props }) => {
  return (
    <div className={styles.wrap}>
      {
        props.editingItem.canEdit && <Menu />
      }
      <Editor data={blocks} />
    </div>
  );
}
);

export default Root;