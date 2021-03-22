import styles from './Button.module.sass';
export default function Button(props: any) {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >{props.children}</button>
  );
}