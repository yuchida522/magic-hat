import styles from './input.module.scss'
const Input = (props) => {
    return (
        <input className={ `${styles.input} ${styles[`input--${props.variant}`]}`}placeholder={props.placeholder} onChange={props.onChange} type="text"/>
    )
}

export default Input