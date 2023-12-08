import styles from '../styles.module.css'
import CloseSVG from '../../../assets/icons/Close.svg?react'
import RoundSVG from '../../../assets/icons/Round.svg?react'
import { Button } from '../../../UI/button/button.js'

export const RoutCard = ({
  name,
  data,
  close,
}: {
  name: string
  data: { buses: string[]; stops: string[] }
  close: () => void
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <p>Маршрут {name}</p>
        <button onClick={close}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.buses}>
        <span>Электробусы: </span>
        {data.buses.map(bus => (
          <div key={bus}>{bus}</div>
        ))}
      </div>
      <div className={styles.stops}>
        {data.stops.map(stop => (
          <div key={stop}>
            <RoundSVG />
            <p>{stop}</p>
          </div>
        ))}
      </div>
      <div>
        <Button bg='primary'>Изменить</Button>
      </div>
    </div>
  )
}
