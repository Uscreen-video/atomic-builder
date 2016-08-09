import atom from 'Editor/atom';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'text',
    content: '',
    settings: {
      backgroundColor: Shape.color('#fff'),
      secondColor: Shape.color('#ddd'),
      backgroundImage: Shape.link('...'),
      padding: '0 0 0 0'
    }
  }
});
