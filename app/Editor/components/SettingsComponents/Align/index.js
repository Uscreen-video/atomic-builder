import { compose, withHandlers, withProps, withState } from 'recompose';
import cx from 'classnames';
import Icon from 'Editor/components/Icon';

import styles from './styles.css';

const Button = ({ align, type, action }) => (
  <button className={cx(styles.alignButton, align === type && styles.active)} onClick={action}>
    <Icon value={`align_${type}`} />
  </button>
);

export default compose(
  withState('active', 'setActive', false),
  withProps(props => ({
    onChange: dir => props.onSettingsChange(props.settingKey, dir)
  })),
  withHandlers({
    alighLeft: props => () => props.onChange('left'),
    alighRight: props => () => props.onChange('right'),
    alighCenter: props => () => props.onChange('center'),
    onClick: props => () => props.setActive(!props.active)
  })
)(({
  alighLeft,
  alighRight,
  alighCenter,
  active,
  label,
  onClick,
  ...rest
}) => (
  <div className={styles.wrap}>
    <div className={styles.container}>
      {
        label &&
          <span
            className={styles.label}
            onClick={onClick}>
            {label}
          </span>
      }
    </div>
    {
      active &&
        <div className={styles.component}>
          <div className={styles.align}>
            <Button action={alighLeft} type='left' {...rest} />
            <Button action={alighCenter} type='center' {...rest} />
            <Button action={alighRight} type='right' {...rest} />
          </div>
        </div>
    }
  </div>
));
