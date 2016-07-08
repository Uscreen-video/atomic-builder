export default ({
  theme,
  children,
  atoms
}) => {
  console.log(children);
  return (
    <div className={theme.wrap}>
      <div className={theme.container}>
        {children}
      </div>
    </div>
  );
}
