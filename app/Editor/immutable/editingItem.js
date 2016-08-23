import { Record } from 'immutable';

class EditingItem extends Record({ // eslint-disable-line new-cap
  active: false,
  type: '',
  editingContent: false,
  sidebarOpen: false,
  mapper: void 0,
  Cursor: void 0,
  canEdit: true
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

  disable() {
    return this
      .set('canEdit', false);
  }

  enable() {
    return this
      .set('canEdit', true);
  }

  get isSidebarOpen() {
    return this.get('sidebarOpen');
  }

  get isContentEditing() {
    return this.get('editingContent');
  }

  get canDrag() {
    return this.get('canEdit') ? this.get('editingContent') : false;
  }
}

export default new EditingItem();
