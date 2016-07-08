import {
  compose, defaultProps, withState,
  createEagerFactory, withPropsOnChange, setDisplayName
} from 'recompose';
import AtomWrap from '../components/AtomWrap';

export default ({ component, props: { type } }) =>
compose(
  setDisplayName(`Atom:${type}`),

  defaultProps({
    Atom: component
  }),

  // withState('children', 'updateAtom', ({ atom }) => atom),
  //
  // withPropsOnChange(['atom'], props => ({
  //   settings: props.atom.get('settings')
  // }))
)(AtomWrap);
