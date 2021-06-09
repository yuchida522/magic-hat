import styles from './input.module.scss'
const Input = (props) => {
    return (
        <input className={ `${styles.input}`}placeholder={props.placeholder} onChange={props.onChange} type="text"/>
    )
}

export default Input