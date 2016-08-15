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
  const { mapper } = editingItem;
  return (
    <div
      className={cx(styles.sidebar, editingItem.active && styles.sidebar_active)}
    >
      <h2 className={styles.sidebar__header}>Settings for {editingItem.type}</h2>
      <ul>
        {
          mapper && Object.keys(mapper).map(key => {
            let component = null;
            const { type, title, value: defaultValue } = mapper[key];
            const settings = organisms.getIn(editingItem.Cursor, 'settings');
            const value = settings.get(key);

            switch (type) {
              case 'color':
                component =  <ColorPicker
                              onSettingsChange={setSettings}
                              defaultColor={value || defaultValue}
                              label={title}
                              settingKey={key}
                            />;
                break;
              case 'padding':
                component = <BoxSpacing
                              onSettingsChange={setSettings}
                              label={title}
                              settingKey={key}
                            />;
                break;
              case 'background':
                component = <FileUploader
                              onSettingsChange={setSettings}
                              label={title}
                              settingKey={key}
                            />;
                break;
              default:
                component = null;
            }

            return (
              component &&
                <li key={title}>
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

