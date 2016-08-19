import { Component, PropTypes } from 'react';
import { compose, toClass, withHandlers } from 'recompose';
import cx from 'classnames';
import withClickHandler from 'react-onclickoutside';

import editorState from 'Editor/helpers/editorState';
import * as components from './components';

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
            const value = (
                Immutable.Iterable.isIterable(settingValue)
                ? settingValue.toJS()
                : settingValue
              ) || defaultValue;
            const SettingsComponent = components[type];
            if (!SettingsComponent) return null;
            return (
              <li key={title}>
                <SettingsComponent
                  onSettingsChange={setSettings}
                  value={value}
                  label={title}
                  settingKey={key} />
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
      if (this.props.editingItem.isSidebarOpen) this.props.releaseItem();
    }

    render() {
      return (
        <EditorSidebar {...this.props} />
      );
    }
  }
));
