import styles from './styles.module.css'

export const AccidentMarkerFC = ({ number }: { number: number }) => {
  return <div className={styles.container}>{number}</div>
}

export const AccidentMarker = (type: string) => `
  <div
    style='border-radius: 32px; border: 1px solid var(--color-border-gray); background-color: #ff0000; padding: 10px 16px;'
  >${type}</div>
`
