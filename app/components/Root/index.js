import 'normalize.css/normalize.css';

// import Builder from '../Builder';
import ReactDOMServer from 'react-dom/server';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Menu } from '../Menu';
import { withEditorContext } from 'Editor/editorContext';
import createEditor from 'Editor/creators/createEditor';
import selector from 'modules/builder/selectors';

import styles from './styles.css';
const Editor = createEditor({ edit: true });

export default compose(
  connect(selector),
  withEditorContext
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
