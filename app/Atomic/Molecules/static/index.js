import molecule from 'Editor/molecule';

export default molecule({
  component: require('./Component').default,
  props: {
    type: 'static',
    theme: {},
    atoms: []
  }
});
