import 'normalize.css/normalize.css';

// import Builder from '../Builder';

import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { Menu } from '../Menu';
import { withEditorContext } from 'Editor/editorContext';
import createEditor from 'Editor/creators/createEditor';
import selector from 'modules/builder/selectors';

import styles from './styles.css';
const Editor = createEditor({ edit: true });

export const Root = compose(
  connect(selector),
  withEditorContext,
  withHandlers({
    exportEditor: props => () => window.render(props)
  })
)(({ blocks, exportEditor, ...props }) => {
  return (
    <div className={styles.wrap}>
      {
        props.editingItem.canEdit && <Menu />
      }
      <Editor data={blocks} exportEditor={exportEditor} />
    </div>
  );
}
);

export default Root;
