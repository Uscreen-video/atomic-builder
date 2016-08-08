import { compose, withState, withHandlers, mapProps, lifecycle, getContext } from 'recompose';
import cx from 'classnames';
import { PropTypes } from 'react';
import * as organisms from 'Atomic/Organisms';
import * as atoms from 'Atomic/Atoms';
import { Motion, spring } from 'react-motion';

import styles from './styles.css';

const { object } = PropTypes;

const organismsArray = Object.keys(organisms).map(key => organisms[key].Preview);
const atomsArray = Object.keys(atoms).map(key => atoms[key].Preview);

const types = {
  organism: organismsArray,
  molecule: [],
  atom: atomsArray
};

const Button = compose(
  withHandlers({
    onMouseOver: props => () => props.onChange(props.type)
  }),
  mapProps(({ onMouseOver, active, type, visible }) => ({
    onMouseOver,
    children: type,
    className: cx(styles.button, active === type && styles.active, !visible && styles.hidden)
  }))
)(props => <button {...props} />);


const List = ({ active, visible }) => active && (
  <Motion style={{ opacity: spring(visible ? 1 : 0, { stiffness: 250 }) }}>
  {
    ({ opacity }) => (
      <div
        className={styles.listWrap}
        style={{ opacity, display: opacity === 0 && 'none' }}>
        <div className={styles.list}>
          {
            types[active].map((Preview, index) => <Preview key={index} />)
          }
        </div>
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
  }),
  lifecycle({
    componentWillReceiveProps(next) {
      if (!next.dragingItem.equals(this.props.dragingItem)) {
        this.props.setVisible(false);
      }
    }
  })
)(props => (
  <div className={styles.wrap} onMouseOver={props.showList} onMouseLeave={props.hideList}>
    <div className={styles.buttonsWrap}>
      <div className={styles.buttons}>
        {
          Object.keys(types).map((type, index) => <Button key={index} type={type} {...props} />)
        }
      </div>
    </div>
    <List active={props.active} visible={props.visible} />
  </div>
));
