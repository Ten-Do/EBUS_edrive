import styles from './styles.module.css'

export const BusMarkerFC = ({ number }: { number: number }) => {
  return <div className={styles.container}>{number}</div>
}

export const BusMarker = (number: number) => `
  <div
    style='border-radius: 32px; border: 1px solid var(--color-border-gray); background-color: var(--color-bg); padding: 10px 16px;'
  >${number}</div>
`
