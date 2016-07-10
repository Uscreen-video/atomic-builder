export default ({
  theme,
  children
}) => (
  <div className={theme.wrap}>
    <div className={theme.container}>
      {children}
    </div>
  </div>
);
