import styles from './styles.module.css'

export const DropdownField = ({
  options=[],
  name,
  label,
}: {
  options: {id: string, text: string}[]
  name: string
  label: string
}) => {
  return (
    <>
      <div className={styles.input_container}>
        <label htmlFor={name}>{label}</label>
        <select className={styles.select} id={name} name={name} placeholder={label}>
          {options.map(opt => (
            <option value={opt.id}>{opt.text}</option>
          ))}
        </select>
      </div>
    </>
  )
}
