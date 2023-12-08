import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import SettingsSVG from '../../assets/icons/Settings.svg?react'
import { IBus, IBusData } from '../../types/bus.js'

export const Table = ({ data = [] }: { data: IBus[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row + ' ' + styles.th}>
        <div className={styles.col_fluid}>Номер</div>
        <div className={styles.col_fluid}>Маршрут</div>
        {/* <div className={styles.col_fluid}>Код</div> */}
        <div className={styles.col_fluid}>Статус</div>
        <div className={styles.col_fluid}>Текущий водитель</div>
        <div className={styles.col_fixed}>На карте</div>
        <div className={styles.col_fixed}>Изменить</div>
      </div>
      {data.map(row => (
        <Row
          row={{
            number: row.number,
            rout: row.route.number,
            status: row.status,
            driver: row.driver.lastName + row.driver.firstName[0] + '.',
          }}
        />
      ))}
    </div>
  )
}

const Row = ({ row }: { row: IBusData }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col_fluid}>{row.number}</div>
      <div className={styles.col_fluid}>{row.rout}</div>
      {/* <div className={styles.col_fluid}>{row.id}</div> */}
      <div className={styles.col_fluid}>{row.status}</div>
      <div className={styles.col_fluid}>{row.driver}</div>
      <button className={styles.col_fixed}>
        <PointSVG />
      </button>
      <button className={styles.col_fixed}>
        <SettingsSVG />
      </button>
    </div>
  )
}
