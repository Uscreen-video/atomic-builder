import { Component } from 'react';
import Resizable from 'react-resizable-box';
import onClickOutside from 'Editor/helpers/onClickOutside';
import cx from 'classnames';
import Dropzone from 'react-dropzone';

import styles from './styles.css';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';

let _maxWidth = 200;

class Editor extends Component {

  state = {
    width: 200,
    height: 200,
    dimention: 1,
    align: 'left',
    isResizing: false
  }

  componentWillMount() {
    const { settings } = this.props;
    const width = settings.get('width') || this.state.width;
    const height = settings.get('height') || this.state.height;
    const align = settings.get('align') || this.state.align;
    this.setState({ width, height, align, dimention: height / width });
  }

  componentDidMount() {
    this.resizer.updateSize(this.state);
  }

  resize = (_, size) => {
    this.setState({ ...size, isResizing: true });
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
    const _self = this;
    const images = await imagesToBase64(files);
    const img = new Image();
    img.onload = function () {
      const dimention = this.height / this.width;
      const width = this.width > 200 ? 200 : this.width;
      _self.setState({ dimention, width });
      _self.resizer.updateSize({ width, height: width * dimention });
      _self.props.onChange(images[0]);
    };
    img.src = images[0];
  }

  render() {
    const { content, style } = this.props;
    const { width, align, isResizing } = this.state;
    return (
      <div
        style={style}
        className={cx(styles.wrap, styles[`align_${align}`])}
        ref={r => _maxWidth = r && r.offsetWidth || 200}>
        <Resizable
          ref={r => this.resizer = r}
          lockAspectRatio
          onResize={this.resize}
          onResizeStop={this.stopResize}
          handleClass={{ bottomRight: styles.handle }}
          isResizable={{ bottomRight: true }}
          maxWidth={_maxWidth}
          customClass={styles.resizable}>
          <Dropzone onDrop={this.onDrop} disableClick={isResizing} className={styles.dropzone}>
            <img src={content} role='presentation' />
            <span className={styles.dropzoneHint}>
              Try dropping some files here, or click to select files to upload.
            </span>
          </Dropzone>
        </Resizable>
      </div>
    );
  }
}

export default onClickOutside(props => props.deactivate())(Editor);
