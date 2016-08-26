import { defaultProps } from 'recompose';
import getStyles from 'Editor/helpers/getStyles';
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
    style={getStyles(settings)}>
    <div className={theme.container}>
      {children}
    </div>
  </div>
));
