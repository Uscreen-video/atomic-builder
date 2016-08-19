import { Component } from 'react';
import withClickHandler from 'react-onclickoutside';
import cx from 'classnames';
import Dropzone from 'react-dropzone';

import styles from '../styles.css';

class Editor extends Component {


  handleClickOutside() {
    this.props.deactivate();
  }

  render() {
    const { content, settings } = this.props;
    return (
      <div className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
        <a href={settings.get('url')} className={cx(styles.button, styles[`button_${settings.get('type')}`])}>
          { content }
        </a>
      </div>
    );
  }
}

export default withClickHandler(Editor);
