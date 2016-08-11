import atom from 'Editor/atom';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'image',
    content: require('./default.png'),
    settings: {}
  }
});
