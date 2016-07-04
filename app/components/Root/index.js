import React, { Component } from 'react';
import 'normalize.css/normalize.css';

// import Builder from '../Builder';
// import Menu from '../Menu';

// import withEditorContext from '../../HOC/withEditorContext';

import styles from './styles.css';

class Root extends Component {
  render() {
    return (
      <div className={styles.wrap}>
        <section className={styles.menu}>
          <Menu />
        </section>
        <section className={styles.builder}>
          <Builder edit />
        </section>
      </div>
    );
  }
}

export default withEditorContext(Root);
