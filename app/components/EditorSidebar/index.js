import { Component, PropTypes } from 'react';
import { compose, toClass, withHandlers } from 'recompose';
import cx from 'classnames';
import withClickHandler from 'react-onclickoutside';

import editorState from 'Editor/helpers/editorState';
import ColorPicker from 'Editor/components/ColorPicker';
import BoxSpacing from 'Editor/components/BoxSpacing';
import FileUploader from 'Editor/components/FileUploader';

import styles from './styles.css';

const EditorSidebar = compose(
  withHandlers({
    setSettings: props => (key, value) => {
      const cursor = props.editingItem.Cursor.push(key);
      props.updateEditorState(cursor, value);
    }
  })
)(({
  editingItem,
  setSettings,
  organisms
}) => {
  return (
    <div
      className={cx(styles.sidebar, editingItem.active && styles.sidebar_active)}
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

export default editorState(withClickHandler(
  class OutsideClickHandler extends Component {
    handleClickOutside() {
      this.props.releaseItem();
    }

    render() {
      const { ...props } = this.props;
      return (
        <EditorSidebar {...props} />
      );
    }
  }
));

