import { Component } from 'react';
import { RichUtils, Entity } from 'draft-js';
import cx from 'classnames';

import styles from './styles.css';
import Button from './Button';
import Separator from './Separator';

function preventClick(e) {
  e.preventDefault();
}

class Mapper extends Component {
  _key = void 0;
  _content = void 0;

  get startKey() {
    return this.selection.getStartKey();
  }

  get content() {
    return this.props.editorState.getCurrentContent();
  }

  get inlineStyle() {
    return this.props.editorState.getCurrentInlineStyle();
  }

  get selection() {
    return this.props.editorState.getSelection();
  }

  get entityKey() {
    const anchorKey = this.selection.getAnchorKey();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    return anchorBlock.getEntityAt(this.selection.anchorOffset);
  }

  get color() {
    return Entity.get(this.key).getData();
  }

  get currentBlock() {
    return this.content.getBlockForKey(this.startKey).getType();
  }

  get key() {
    return this._key;
  }

  initialize() {
    this._key = this.entityKey;
    this._content = this.props.editorState.getCurrentContent();
  }

  has(key) {
    if (this.key) {
      const entity = Entity.get(this.key);
      if (entity.getType() === key) {
        return true;
      }
    }
    return false;
  }

  inCollection(collection) {
    return collection.find(item => this.currentBlock === item);
  }

  unlink() {
    if (!this.selection.isCollapsed()) {
      this.props.onChange(RichUtils.toggleLink(this.props.editorState, this.selection, null));
    }
  }

  toggleInlineStyle(style) {
    const newState = RichUtils.toggleInlineStyle(this.props.editorState, style);
    return () => this.props.onChange(newState);
  }

  toggleBlockStyle(type) {
    const newState = RichUtils.toggleBlockType(this.props.editorState, type);
    return () => this.props.onChange(newState);
  }

  inline(style) {
    return {
      onChange: this.toggleInlineStyle(style),
      active: this.inlineStyle.has(style)
    };
  }

  block(style) {
    return {
      onChange: this.toggleBlockStyle(style),
      active: style === this.currentBlock
    };
  }

  entity(type, collection) {
    const entityKey = this.key;
    switch (type) {
      case 'link': {
        const hasLink = this.has('LINK');
        return {
          active: hasLink,
          onChange: () => this.props.setActive({ type, entityKey })
        };
      }
      case 'color': {
        const hasColor = this.has('COLOR');
        return {
          active: hasColor,
          color: hasColor && this.color,
          onChange: () => this.props.setActive({ type, entityKey })
        };
      }
      default:
        return {
          onChange: () => this.props.setActive({ type }),
          active: this.inCollection(collection) || false
        };
    }
  }

  get(type, ...rest) {
    return this[type](...rest);
  }

  render() {
    this.initialize();

    return (
      <ul className={cx(styles.list, this.props.className)} onMouseDown={preventClick}>
        {
          this.props.actions.map(({ type, style, collection, ...rest }, key) =>
            type === 'separator'
            && <Separator key={key} />
            || <Button key={key} {...rest} {...this.get(type, style, collection)} />
          )
        }
      </ul>
    );
  }
}


export default Mapper;
