import styles from './button.module.scss'

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`${styles.button} ${styles[`button--${props.variant}`]}`}>{props.children}</button>
  )
}

export default Button