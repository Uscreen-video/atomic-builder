import { Component } from 'react';
import withClickHandler from 'react-onclickoutside';

import Draft from 'Editor/draft';

class Editor extends Component {

  handleClickOutside() {
    this.props.deactivate(); // eslint-disable-line new-cap
  }

  render() {
    return <Draft {...this.props} />;
  }
}

export default withClickHandler(Editor);
