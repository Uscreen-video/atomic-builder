import Player from 'react-player';
import cx from 'classnames';

import Editor from './Editor/';
import styles from './styles.css';


const Content = ({ settings, content }) => (
  <div className={cx(styles.videoWrap, styles[`align_${settings.get('align')}`])}>
    <Player
      url={content}
      width={settings.get('width') || 200}
      height={settings.get('height') || 200} />
  </div>
);

export default ({
  content,
  active,
  deactivate,
  updateSettings,
  settings,
  onChange
}) => (
  <div className={styles.wrap}>
  {
    !active
    ? <Content content={content} settings={settings} />
    : <Editor {...{ content, deactivate, onChange, settings, updateSettings }} />
  }
  </div>
);
