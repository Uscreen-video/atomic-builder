export default ({
  theme,
  atoms
}) => (
  <div className={theme.wrap}>
    <div className={theme.container}>
      {atoms}
    </div>
  </div>
);
