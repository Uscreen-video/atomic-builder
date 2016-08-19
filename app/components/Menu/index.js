import { compose, withState, withHandlers, mapProps, lifecycle, getContext } from 'recompose';
import cx from 'classnames';
import { PropTypes } from 'react';
import * as organisms from 'Atomic/Organisms';
import * as atoms from 'Atomic/Atoms';
import { Motion, spring } from 'react-motion';
import Animation, { computeStyles } from 'Editor/immutable/animation';

import Toggler from './Toggler';
import styles from './styles.css';

const { object } = PropTypes;

const organismsArray = Object.keys(organisms).map(key => organisms[key].Preview);
const atomsArray = Object.keys(atoms).map(key => atoms[key].Preview);

const types = {
  organism: organismsArray,
  molecule: [],
  atom: atomsArray
};


const getButtonAnimation = (type, active) =>
  active
    && new Animation().animate('x', 0).animate('opacity', 1).run
    || new Animation().animate('x', type === 'organism' ? 20 : -20).animate('opacity', 0).run;

const Button = compose(
  withHandlers({
    onMouseOver: props => () => props.onChange(props.type)
  }),
  mapProps(({ onMouseOver, active, type, title, visible }) => ({
    onMouseOver,
    visible,
    type,
    children: title,
    className: cx(
      styles.button,
      styles[`button_${type}`],
      active === type && styles.active
    )
  }))
)(({ visible, ...props }) => (
  <Motion style={getButtonAnimation(props.type, visible)}>
    { motion => <button style={computeStyles(motion)} {...props} /> }
  </Motion>
));


const List = ({ active, visible }) => (
  <Motion style={{ opacity: spring(visible ? 1 : 0, { stiffness: 250 }) }}>
  {
    ({ opacity }) => (
      <div style={{ opacity, display: opacity <= 0.3 && 'none' }}>
        { Object.keys(types).map(type =>
          <div key={type} className={cx(styles.listWrap, active === type && styles.activeList)}>
            <div className={styles.list}>
              {
                types[type].map((Preview, index) => <Preview key={index} />)
              }
            </div>
          </div>
        )}
      </div>
    )
  }
  </Motion>
);

export const Menu = compose(
  getContext({ dragingItem: object }),
  withState('active', 'setActive', false),
  withState('visible', 'setVisible', false),
  withHandlers({
    onChange: props => key => props.setActive(key),
    hideList: props => () => props.setVisible(false),
    showList: props => () => props.setVisible(true),
    toggleMenu: props => () => props.setVisible(!props.visible)
  }),
  lifecycle({
    componentWillReceiveProps(next) {
      if (!next.dragingItem.equals(this.props.dragingItem)) {
        this.props.setVisible(false);
      }
    }
  })
)(props => (
  <div
    className={cx(styles.wrap, props.visible && styles.wrapActive)} onMouseLeave={props.hideList}>
    <div className={styles.tabs}>
      <Button type='organism' title='Shapes' {...props} />
      <Toggler onClick={props.toggleMenu} active={props.visible} />
      <Button type='atom' title='Elements' {...props} />
    </div>
    <List active={props.active} visible={props.visible} />
  </div>
));
