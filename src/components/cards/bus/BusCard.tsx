import styles from '../styles.module.css'
import CloseSVG from '../../../assets/icons/Close.svg?react'
import { Button } from '../../../UI/button/button.js'
export const BusCard = ({
  name,
  data,
  close,
}: {
  name: string
  data: {
    battery: string
    rout: string
    driver: string
    load: string
    chill: string
    charging: string
    currentStop: string
    nextStop: string
  }
  close: () => void
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <p>
          {name}
          <span>{data.battery}%</span>
        </p>
        <button onClick={close}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.body}>
        <p>
          <span>Маршрут:</span>
          {data.rout}
        </p>
        <p>
          <span>Водитель:</span>
          {data.driver}
        </p>
        <p>
          <span>Заполненность:</span>
          {data.load}
        </p>
        <p>
          <span>Отдых:</span>
          {data.chill}
        </p>
        <p>
          <span>Следующая зарядка:</span>
          {data.charging}
        </p>
        <p>
          <span>Текущая остановка:</span>
          {data.currentStop}
        </p>
        <p>
          <span>Следующая остановка:</span>
          {data.nextStop}
        </p>
      </div>
      <div>
        <Button bg='primary'>Связаться с водителем</Button>
      </div>
    </div>
  )
}
