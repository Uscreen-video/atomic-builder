import { PropTypes } from 'react';
import { compose, getContext, withState, withHandlers } from 'recompose';
import cx from 'classnames';
const { func, bool, object } = PropTypes;

import editorState from 'Editor/helpers/editorState';
import ColorPicker from 'Editor/components/ColorPicker';
import BoxSpacing from 'Editor/components/BoxSpacing';
import FileUploader from 'Editor/components/FileUploader';

import styles from './styles.css';

export default compose(
  editorState,
  withHandlers({
    mouseLeave: props => e => {
      e.stopPropagation();
      props.releaseItem();
    },
    setSettings: props => (key, value) => {
      const cursor = props.editingItem.Cursor.push(key);
      props.updateEditorState(cursor, value);
    }
  })
)(({
  editingItem,
  mouseLeave,
  setSettings,
  organisms
}) => {
  return (
    <div
      className={cx(styles.sidebar, editingItem.active && styles.sidebar_active)}
      onMouseLeave={mouseLeave}
    >
      <h2 className={styles.sidebar__header}>Settings for {editingItem.type}</h2>
      <ul>
        {
          editingItem.defaultSettings && editingItem.defaultSettings.entrySeq().map(setting => {
            let component = null;
            const [key, defaultSetting] = setting;
            const settings = organisms.getIn(editingItem.Cursor, 'settings');
            const value = settings.get(key);

            

            switch (defaultSetting.get('type')) {
              case 'color':
                component =  <ColorPicker
                              onSettingsChange={setSettings}
                              onSettingsChange={setSettings}
                              defaultColor={value}
                              label={defaultSetting.get('title')}
                              settingKey={key}
                            />;
                break;
              case 'padding':
                component = <BoxSpacing
                              onSettingsChange={setSettings}
                              label={defaultSetting.get('title')}
                              settingKey={key}
                            />;
                break;
              case 'url':
                component = <FileUploader
                              onSettingsChange={setSettings}
                              label={defaultSetting.get('title')}
                              settingKey={key}
                            />;
                break;
              default:
                component = null;
            }

            return (
              component &&
                <li key={defaultSetting.get('title')}>
                  {component}
                </li>
            );
          })
        }
      </ul>
    </div>
  );
}
);
