import { compose, withHandlers } from 'recompose';
import cx from 'classnames';
import styles from './styles.css';
import Icon from 'Editor/components/Icon';

const Button = ({ align, type, action }) => (
  <button className={cx(styles.alignButton, align === type && styles.active)} onClick={action}>
    <Icon value={`align_${type}`} />
  </button>
);

export default compose(
  withHandlers({
    alighLeft: props => () => props.onChange('left'),
    alighRight: props => () => props.onChange('right'),
    alighCenter: props => () => props.onChange('center')
  })
)(({
  alighLeft,
  alighRight,
  alighCenter,
  ...rest
}) => (
  <div className={styles.align}>
    <Button action={alighLeft} type='left' {...rest} />
    <Button action={alighCenter} type='center' {...rest} />
    <Button action={alighRight} type='right' {...rest} />
  </div>
));
