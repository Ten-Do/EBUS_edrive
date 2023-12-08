import { useState } from 'react'
import { IRout } from '../../types/rout.js'
import { Button } from '../../UI/button/button.js'
import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import RoundSVG from '../../assets/icons/Round.svg?react'

export const RouteCard = ({ route, set }: { route: IRout; set: () => void }) => {
  const [expanded, setExpanded] = useState(false)
  console.log(route)

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.head}>
          <div>
            <h2>Маршрут №{route.Number}</h2>
            <p>{route.Stations.length} остановок</p>
          </div>
          <div>
            <Button
              clickHandler={() => {
                set()
              }}
            >
              <PointSVG />
            </Button>
          </div>
        </div>
        {expanded && (
          <div className={styles.content}>
            {route.Stations.map(station => (
              <div key={station.Lat}>
                <span className={styles.round}>
                  <RoundSVG />
                </span>
                {station.Name}
              </div>
            ))}
          </div>
        )}
        <div className={styles.footer} onClick={() => setExpanded(curr => !curr)}>
          {expanded ? 'Свернуть' : 'Развернуть'}
        </div>
      </div>
    </div>
  )
}
