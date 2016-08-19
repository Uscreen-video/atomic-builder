import { Component, PropTypes } from 'react';
import { compose, toClass, withHandlers } from 'recompose';
import cx from 'classnames';
import withClickHandler from 'react-onclickoutside';

import editorState from 'Editor/helpers/editorState';
import ColorPicker from 'Editor/components/Color';
import BoxSpacing from 'Editor/components/BoxSpacing';
import FileUploader from 'Editor/components/FileUploader';
import Shadow from 'Editor/components/Shadow';
import Border from 'Editor/components/Border';

import Immutable from 'immutable';

import styles from './styles.css';

const EditorSidebar = compose(
  withHandlers({
    setSettings: props => (key, value) => {
      const cursor = props.editingItem.get('Cursor').push(key);
      props.updateEditorState(cursor, value);
    }
  })
)(({
  editingItem,
  setSettings,
  organisms
}) => {
  const mapper = editingItem.get('mapper');
  const cursor = editingItem.get('Cursor');
  return (
    <div className={cx(styles.sidebar, styles.sidebar_active)}>
      <h2 className={styles.sidebar__header}>Settings for {editingItem.type}</h2>
      <ul>
        {
          Object.keys(mapper).map(key => {
            let component = null;
            const { type, title, value: defaultValue } = mapper[key];
            const settings = organisms.getIn(cursor, 'settings');
            const settingValue = settings.get(key);
            const value = (Immutable.Iterable.isIterable(settingValue) ? settingValue.toJS() : settingValue) || defaultValue;

            switch (type) {
              case 'color':
                component =  <ColorPicker
                              onSettingsChange={setSettings}
                              color={value}
                              label={title}
                              settingKey={key}
                            />;
                break;
              case 'padding':
                component = <BoxSpacing
                              onSettingsChange={setSettings}
                              label={title}
                              spacing={value}
                              settingKey={key}
                            />;
                break;
              case 'background':
                component = <FileUploader
                              onSettingsChange={setSettings}
                              label={title}
                              background={value}
                              settingKey={key}
                            />;
                break;
              case 'shadow':
                component = <Shadow
                              onSettingsChange={setSettings}
                              label={title}
                              boxShadow={value}
                              settingKey={key}
                            />;
                break;
              case 'border':
                component = <Border
                              onSettingsChange={setSettings}
                              label={title}
                              border={value}
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
      console.log('click utside');
      if (this.props.editingItem.isSidebarOpen) this.props.releaseItem();
    }

    render() {
      return (
        <EditorSidebar {...this.props} />
      );
    }
  }
));
