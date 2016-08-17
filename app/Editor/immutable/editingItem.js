import { Record } from 'immutable';

class EditingItem extends Record({ // eslint-disable-line new-cap
  active: false,
  type: '',
  editingContent: false,
  sidebarOpen: false,
  mapper: void 0,
  Cursor: void 0
})
{
  editSettings({ type, mapper, Cursor }) {
    return this
      .set('sidebarOpen', true)
      .set('type', type)
      .set('mapper', mapper)
      .set('Cursor', Cursor);
  }

  editContent(Cursor) {
    return this
      .set('sidebarOpen', false)
      .set('editingContent', true)
      .set('Cursor', Cursor);
  }

  release() {
    return this
      .set('sidebarOpen', false)
      .set('editingContent', false);
  }

  get isSidebarOpen() {
    return this.get('sidebarOpen');
  }

  get isContentEditing() {
    return this.get('editingContent');
  }

  get canDrag() {
    return this.get('editingContent');
  }
}

export default new EditingItem();
