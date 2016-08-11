import { Component } from 'react';
import Resizable from 'react-resizable-box';
import withClickHandler from 'react-onclickoutside';
import styles from './styles.css';

class Editor extends Component {

  state = {
    width: void 0,
    height: void 0
  }

  componentWillUnmount() {
    const { settings } = this.props;
    const width = settings.get('width') || this.state.width;
    const height = settings.get('height') || this.state.height;
    this.setState({ width, height });
  }

  handleClickOutside() {
    this.props.deactivate();
  }

  resize = (_, size) => {
    this.setState(size);
  }

  render() {
    const { content, settings } = this.props;

    return (
      <div className={styles.wrap}>
        <Resizable
          onResize={this.resize}
          isResizable={{ left: false, top: false }}
          customClass={styles.resizable}>
          <img style={{ ...this.state }} src={content} role='presentation' />
        </Resizable>
      </div>
    );
  }
}

export default withClickHandler(Editor);
