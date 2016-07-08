import { compose, withState, withHandlers, mapProps, lifecycle, getContext } from 'recompose';
import cx from 'classnames';
import { PropTypes } from 'react';
import * as organisms from 'Atomic/Organisms';
import * as atoms from 'Atomic/Atoms';

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
    onClick: props => () => props.onChange(props.type)
  }),
  mapProps(({ onClick, active, type }) => ({
    onClick,
    children: type,
    className: cx(styles.button, active === type && styles.active)
  }))
)(props => <button {...props} />);


const List = ({ active }) => active && (
  <div className={cx(styles.listWrap)}>
    <div className={styles.list}>
      {
        types[active].map((Preview, index) => <Preview key={index} />)
      }
    </div>
  </div>
);

export const Menu = compose(
  withState('active', 'setActive', false),
  withHandlers({
    onChange: props => key => props.setActive(key),
    hideList: props => () => props.setActive(false)
  })
)(props => (
  <div className={styles.wrap} onMouseLeave={props.hideList}>
    <div className={styles.buttonsWrap}>
      <div className={styles.buttons}>
        {
          Object.keys(types).map((type, index) => <Button key={index} type={type} {...props} />)
        }
      </div>
    </div>
    <List active={props.active} />
  </div>
));
