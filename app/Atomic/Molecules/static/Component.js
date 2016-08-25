import { defaultProps } from 'recompose';
import styles from './styles.css';

const getStyles = settings => {
  const res = {
    backgroundColor: settings.get('backgroundColor')
  };

  const padding = settings.get('padding');
  if (padding) {
    const { top, right, bottom, left } = padding;
    res.padding = `${top}px ${right} ${bottom} ${left}`;
  }

  return res;
};

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
