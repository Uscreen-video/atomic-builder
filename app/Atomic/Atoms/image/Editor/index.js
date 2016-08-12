import { Component } from 'react';
import Resizable from 'react-resizable-box';
import withClickHandler from 'react-onclickoutside';
import styles from './styles.css';
import AlignButtons from './AlignButtons';
import cx from 'classnames';
import { Map } from 'immutable';

class Editor extends Component {

  state = {
    width: void 0,
    height: void 0,
    align: 'left'
  }

  componentWillMount() {
    const { settings } = this.props;
    const width = settings.get('width') || this.state.width;
    const height = settings.get('height') || this.state.height;
    const align = settings.get('align') || this.state.align;
    this.setState({ width, height, align });
  }

  handleClickOutside() {
    this.props.updateSettings(Map(this.state)); // eslint-disable-line new-cap
    this.props.deactivate();
  }

  resize = (_, size) => {
    this.setState(size);
  }

  setAlign = (align) => {
    this.setState({ align });
  }

  render() {
    const { content, settings } = this.props;
    const { width, height, align } = this.state;
    return (
      <div className={cx(styles.wrap, styles[`align_${align}`])}>
        <Resizable
          onResize={this.resize}
          handleClass={{ bottomRight: styles.handle }}
          isResizable={{ bottomRight: true }}
          customClass={styles.resizable}>
          <img style={{ width, height }} src={content} role='presentation' />
          <AlignButtons onChange={this.setAlign} align={align} />
        </Resizable>
      </div>
    );
  }
}

export default withClickHandler(Editor);
