import { compose, withState, lifecycle, withHandlers } from 'recompose';
import cx from 'classnames';

import styles from './styles.css';
import Buttons from './Buttons';
import getSelectionCoords from '../helpers/getSelectionCoords';
import Overlay from './Overlay';
import LinkInput from './LinkInput';
import ColorPicker from './ColorPicker';
import * as actions from './actions';

export default compose(
  withState('show', 'changeShow', false),
  withState('position', 'updatePosition', {}),
  withState('active', 'setActive', false),
  withHandlers({
    resetActive: props => () => props.setActive({})
  }),

  lifecycle({
    shouldComponentUpdate(next, prev) {
      return !prev || next.editorState.getSelection() !== prev.editorState.getSelection();
    },

    componentWillReceiveProps(next) {
      if (!next.editor || next.editorState === this.props.editorState) return;
      const selection = next.editorState.getSelection();
      if (!selection.isCollapsed()) {
        const position = getSelectionCoords(next.editor);
        if (position) {
          this.props.updatePosition(position);
          this.props.changeShow(true);
        }
      } else {
        this.props.changeShow(false);
      }
    }
  }),

)(({
  show,
  position,
  active,
  resetActive,
  ...rest
}) => (
  <div style={position} className={cx(styles.toolbarWrap, show && styles.toolbarVisible)}>
    <div className={styles.toolbar}>
      <Buttons actions={actions.base} {...rest} />
      <Overlay active={active.type === 'link'} onCancel={resetActive}>
        <LinkInput {...rest} onCancel={resetActive} active={active === 'link'} />
      </Overlay>
      <Overlay active={active.type === 'font'} onCancel={resetActive}>
        <Buttons actions={actions.font} {...rest} />
      </Overlay>
      <Overlay active={active.type === 'color'} onCancel={resetActive}>
        <ColorPicker {...rest} onCancel={resetActive} {...active} />
      </Overlay>
    </div>
  </div>
));
