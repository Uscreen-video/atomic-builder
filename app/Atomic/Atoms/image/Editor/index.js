import { Component } from 'react';
import Resizable from 'react-resizable-box';
import withClickHandler from 'react-onclickoutside';
import cx from 'classnames';
import { Map } from 'immutable';
import Dropzone from 'react-dropzone';

import styles from './styles.css';
import AlignButtons from './AlignButtons';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';

class Editor extends Component {

  state = {
    width: void 0,
    height: void 0,
    align: 'left',
    isResizing: false
  }

  componentWillMount() {
    const { settings } = this.props;
    const width = settings.get('width') || this.state.width;
    const height = settings.get('height') || this.state.height;
    const align = settings.get('align') || this.state.align;
    this.setState({ width, height, align });
  }

  handleClickOutside() {
    this.props.deactivate();
  }

  resize = (_, size) => {
    this.setState({ ...size, isResizing: false });
  }

  stopResize = () => {
    this.props.updateSettings(this.state); // eslint-disable-line new-cap
    this.setState({ isResizing: false });
  }

  setAlign = (align) => {
    this.props.updateSettings({ align });
    this.setState({ align });
  }

  onDrop = async files => {
    if (!files) return;
    const images = await imagesToBase64(files);
    this.props.onChange(images[0]);
    this.setState({ width: void 0, height: void 0 });
  }

  render() {
    const { content } = this.props;
    const { width, height, align, isResizing } = this.state;
    return (
      <div className={cx(styles.wrap, styles[`align_${align}`])}>
        <Resizable
          onResize={this.resize}
          onResizeStop={this.stopResize}
          handleClass={{ bottomRight: styles.handle }}
          isResizable={{ bottomRight: true }}
          customClass={styles.resizable}>
          <Dropzone onDrop={this.onDrop} disableClick={isResizing} className={styles.dropzone}>
            <img style={{ width, height }} src={content} role='presentation' />
            <span className={styles.dropzoneHint}>
              Try dropping some files here, or click to select files to upload.
            </span>
          </Dropzone>
          <AlignButtons onChange={this.setAlign} width={width} align={align} />
        </Resizable>
      </div>
    );
  }
}

export default withClickHandler(Editor);
