import { defaultProps } from 'recompose';
import styles from './styles.css';

export default defaultProps({
  theme: styles
})(({
  theme,
  children
}) => (
  <div className={theme.wrap}>
    <div className={theme.container}>
      {children}
    </div>
  </div>
));
