import styles from './styles.css';
import cx from 'classnames';
import withEditorState from '../../helpers/editorState';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withEditorState,
  withState('over', 'setOver', false),
  withHandlers({
    mouseOver: props => e => {
      e.stopPropagation();
      props.setOver(true);
    },
    mouseOut: props => e => {
      e.stopPropagation();
      props.setOver(false);
    }
  })
)(({
  outside,
  children,
  preview,
  over,
  title,
  mouseOver,
  mouseOut
}) => (
  <div
    className={styles.wrap}
    onMouseOver={mouseOver}
    onMouseOut={mouseOut}>
    <div>
      {preview && preview(<div>{children}</div>) || children}
    </div>
    <div className={cx(styles.border, over && styles.over)}>
      <div className={styles.vertiacalBorder} />
      <div className={styles.horizontalBorder} />
      <div className={cx(styles.title, outside && styles.outside)}>{title}</div>
    </div>
  </div>
));
