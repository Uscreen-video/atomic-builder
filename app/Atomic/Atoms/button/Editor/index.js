import onClickOutside from 'Editor/helpers/onClickOutside';
import cx from 'classnames';
import Input from 'react-input-autosize';
import { compose, withHandlers } from 'recompose';

import styles from '../styles.css';

const focus = (r) => r && r.refs.input.focus();

const Editor = compose(
  withHandlers({
    onChange: props => e => props.onChange(e.target.value)
  })
)(({
  content,
  settings,
  onChange,
  style
}) => (
  <div className={cx(styles.wrap, styles[`align_${settings.get('align')}`])}>
    <a
      style={style}
      href={settings.get('url')}
      className={cx(styles.button, styles[`button_${settings.get('type')}`])}>
      <Input
        minWidth={20}
        ref={focus}
        className={styles.input}
        type='text'
        defaultValue={content}
        onChange={onChange} />
    </a>
  </div>
));

export default onClickOutside(props => props.deactivate())(Editor);
