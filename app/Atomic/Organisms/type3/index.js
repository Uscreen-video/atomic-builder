import organism from 'Editor/organism';

export default organism({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'type3',
    molecules: {
      Main: {
        type: 'static'
      },
      Second: {
        type: 'static'
      },
      Third: {
        type: 'static'
      },
      Forth: {
        type: 'static'
      }
    },
    settings: {}
  }
});
