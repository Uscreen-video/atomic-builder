import styles from './styles.css';
import StaticMolecule from 'Atomic/Molecules/static';

export default ({
  settings,
  main
}) => {
  console.log(main);
  return (
    <div className={styles.wrap} styles={{ backgroundColor: settings.background }}>
      <div className={styles.container}>
        {main}
      </div>
    </div>
  );
}
