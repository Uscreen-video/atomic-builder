import { defaultProps } from 'recompose';
import styles from './styles.css';

export default defaultProps({
  theme: styles
})(({
  theme,
  children,
  settings
}) => (
  <div
    className={theme.wrap}
    style={{
      backgroundColor: settings.get('backgroundColor'),
      padding: settings.get('padding')
    }}>
    <div className={theme.container}>
      {children}
    </div>
  </div>
));
