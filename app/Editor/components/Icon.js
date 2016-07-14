const icons = require.context('!!svg-sprite!../icons', false, /^\.\/.*\.svg$/);

export function hasIcon(icon) {
  return icons.keys().includes(`./${icon}.svg`);
}

export default ({ value, className, fill, width = 16, height = 16 }) => (
  <svg className={className} width={width} height={height} style={{ fill }}>
    <use xlinkHref={icons(`./${value}.svg`)} />
  </svg>
);
