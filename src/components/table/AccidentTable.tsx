import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import { IAccident } from '../../types/accident.ts'
import { useMapglContext } from '../map2gis/MapglContext.tsx'

export const Table = ({ data = [] }: { data: IAccident[] }) => {
  const {mapglInstance} = useMapglContext()
  return (
    <div className={styles.container}>
      <div className={styles.row + ' ' + styles.th}>
        <div className={styles.col_fluid}>Название</div>
        <div className={styles.col_fluid}>Начало</div>
        <div className={styles.col_fluid}>Конец</div>
        <div className={styles.col_fixed}>На карте</div>
      </div>
      {data.map(row => (
        <Row
          key={row.id}
          row={row}
          show={() => {mapglInstance?.setCenter([row.Lat, row.Lon])}}
        />
      ))}
    </div>
  )
}

const Row = ({ row, show }: { row: IAccident, show: () => void }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col_fluid}>{row.Name}</div>
      <div className={styles.col_fluid}>{row.StartDate}</div>
      <div className={styles.col_fluid}>{row.EndDate || '-'}</div>
      <button className={styles.col_fixed} onClick={show}>
        <PointSVG />
      </button>
    </div>
  )
}
