import atom from 'Editor/atom';
import { shape as Shape } from 'Editor/creators/createShape';

export default atom({
  preview: require('./preview.png'),
  component: require('./Component').default,
  props: {
    type: 'text',
    content: '<h4>We\'re here to put a dent in the universe. Otherwise why else even be here?</h3><p>Each type of visual aid has pros and cons that must be evaluated to ensure it will be beneficial to the overall presentation. Before incorporating visual aids into speeches, the speaker should understand that if used incorrectly, the visual will not be an aid, but a distraction. Planning ahead is important when using visual aids.</p>',
    settings: {
      colors: Shape.color({ background: 'transparent', color: '' }),
      font: Shape.font({ weight: 400, size: 16, style: 'normal', family: 'Arial', transform: 'none', decoration: 'none' }),
      padding: Shape.padding({ top: 0, right: 0, bottom: 0, left: 0 }),
      border: Shape.border({ width: 0, style: 'solid', color: '#000', radius: 0 }),
      shadow: Shape.shadow({ x: 0, y: 0, blur: 0, spread: 0, color: '#333' })
    }
  }
});
