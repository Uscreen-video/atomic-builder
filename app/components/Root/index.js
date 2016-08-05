import 'normalize.css/normalize.css';

// import Builder from '../Builder';
import { Menu } from '../Menu';

import { withEditorContext } from 'Editor/editorContext';
import { compose } from 'recompose';
import createEditor from 'Editor/creators/createEditor';
import { connect } from 'react-redux';
import selector from 'modules/builder/selectors';

import styles from './styles.css';
const Editor = createEditor({ edit: true });

export default compose(
  connect(selector),
  withEditorContext
)(({ blocks }) => (
  <div className={styles.wrap}>
    <section className={styles.menu}>
      <Menu />
    </section>
    <Editor data={blocks} />
  </div>
));
