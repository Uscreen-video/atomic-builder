import { Component } from 'react';
import Resizable from 'react-resizable-box';
import withClickHandler from 'react-onclickoutside';
import Player from 'react-player';

import cx from 'classnames';
import { Map } from 'immutable';
import Dropzone from 'react-dropzone';

import styles from './styles.css';
import AlignButtons from './AlignButtons';
import imagesToBase64 from 'Editor/helpers/imagesToBase64';


let _maxWidth = 200;

class Editor extends Component {

  state = {
    width: 200,
    height: 200,
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

  selectVideo = () => {
    const video = prompt('Write url to video file');
    this.setState({ width: `200px`, height: `200px` });
    this.props.onChange(video);
  }

  render() {
    const { content } = this.props;
    const { width, height, align, isResizing } = this.state;
    return (
      <div
        className={cx(styles.wrap, styles[`align_${align}`])}
        ref={r => _maxWidth = r && r.offsetWidth || 200}>
        <Resizable
          onResize={this.resize}
          onResizeStop={this.stopResize}
          handleClass={{ bottomRight: styles.handle }}
          isResizable={{ bottomRight: true }}
          width={width}
          height={height}
          customClass={styles.resizable}>
          <div className={styles.dropzone} onClick={this.selectVideo}>
            <Player width={width} height={height} url={content} />
            <span className={styles.dropzoneHint}>
              Click here, to select video
            </span>
          </div>
          <AlignButtons onChange={this.setAlign} width={width} align={align} />
        </Resizable>
      </div>
    );
  }
}

export default withClickHandler(Editor);
