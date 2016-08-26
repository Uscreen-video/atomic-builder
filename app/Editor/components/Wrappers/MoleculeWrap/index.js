import { PropTypes } from 'react';
import { compose, getContext } from 'recompose';
import withEditorState from 'Editor/helpers/editorState';
import styles from './styles.css';
import Customizer from '../../Customizer/';

const Placeholder = ({ atoms }) => !atoms.size && (
  <div className={styles.placeholder}>
    <div className={styles.placeholderBorder} />
    Drop atoms here
  </div>
);

export default compose(
  withEditorState,
  getContext({
    editorDisabled: PropTypes.bool
  }),
)(({
  Molecule,
  editorDisabled,
  ...props
}) => {
  if (editorDisabled) return <Molecule {...props} />;
  return (
    <Customizer
      {...props}
      title='Molecule'
      outside>
      {
        props.editingItem.canEdit && <Placeholder {...props} />
      }
      <Molecule {...props} />
    </Customizer>
  )
});
