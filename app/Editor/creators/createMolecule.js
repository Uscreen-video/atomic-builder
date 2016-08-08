import {
  compose, defaultProps, pure,
  withPropsOnChange, createEagerElement, withProps
} from 'recompose';

import * as Atoms from 'Atomic/Atoms';

import MoleculeWrap from '../components/MoleculeWrap';
import dndState from '../dnd/state';
import editorState from '../helpers/editorState';
import dndHandler from '../dnd/handler';

const mapAtoms = (atoms, props) => atoms.map((atom, index) =>
  createEagerElement(
    Atoms[atom.get('type')].Component,
    {
      ...props,
      index, atom,
      content: props.molecule.getIn(['atoms', index, 'content']),
      key: atom.get('id'),
      Cursor: props.Cursor.push('atoms', index)
    }
  )
);

export default ({ component, props: { type } }) =>
compose(
  // Prevent updates from parent state
  // disableUpdate(),

  // Set Component to render
  defaultProps({ Molecule: component }),

  // Connect to EditorState
  editorState,

  // We allow to move atoms inside molece
  dndState('atoms', 'molecule'),

  //
  // withPropsOnChange(['molecule'], props => {
  //   // console.log(props);
  //   return ({
  //     settings: props.molecule.get('settings')
  //   })
  // }),


  // Map atoms from state to components
  withProps(props => ({
    children: mapAtoms(props.atoms, props),
  })),

  dndHandler('molecule')

)(MoleculeWrap);
