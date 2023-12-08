import Logo from '../../assets/icons/FullLogoBlack.svg?react'
import styles from './styles.module.css'
import BackArrowSVG from '../../assets/icons/navbar/back_arrow.svg?react'
import { useKeycloak } from '@react-keycloak/web'
import { useContext, useEffect, useState } from 'react'
import { CentrifugoContext } from '../../Auth.js'
import { useMapglContext } from '../map2gis/MapglContext.js'
import PointSVG from '../../assets/icons/Point.svg?react'
import $api from '../../http/api.js'

interface Notification {
  id: number
  lat: number
  lon: number
  name: string
  start_date: string
}

export const Navbar = () => {
  const { keycloak } = useKeycloak()
  const centrifuge = useContext(CentrifugoContext)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { mapglInstance, mapgl } = useMapglContext()
  const [coordinates, setCoordinates] = useState<number[]>([])
  const [weather, setWeather] = useState('')

  useEffect(() => {
    $api
      .get('weather', 'weather/' + 37.623082 + ',' + 55.75254, keycloak.token!)
      .then(data => setWeather(data.data))
  }, [])

  useEffect(() => {
    if (!centrifuge) return
    const newSub = centrifuge.newSubscription('geo:accident')
    newSub.on('publication', function (ctx) {
      setNotifications(notifications => [...notifications, ctx.data])
    })
    newSub.subscribe()

    // Функция очистки
    return () => {
      newSub.unsubscribe()
      centrifuge.removeSubscription(newSub)
    }
  }, [centrifuge])

  useEffect(() => {
    if (!coordinates.length || !mapgl || !mapglInstance) return
    const marker = new mapgl.Marker(mapglInstance, {
      coordinates: coordinates,
    })
    mapglInstance.setCenter(coordinates)
    return () => marker.destroy()
  }, [coordinates, mapgl, mapglInstance])

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div>
          <Logo />
        </div>
      </div>
      {notifications.length > 0 && (
        <div className={styles.notification}>
          {notifications.map(notification => (
            <div id='snackbar'>
              <p>Произошло ДТП</p>
              <button
                onClick={() => {
                  setCoordinates([notification.lat, notification.lon])
                }}
              >
                <PointSVG />
              </button>
            </div>
          ))}
        </div>
      )}
      {weather && (
        <div className={styles.weather}>
          {/* <p>{weather.weather.Description}</p> */}
          <p>Температура: {Math.round(weather.temp)} C</p>
        </div>
      )}
      <div className={styles.links_container}>
        <button className={styles.link} onClick={() => keycloak.logout()}>
          <BackArrowSVG />
          <p>Выход</p>
        </button>
      </div>
    </div>
  )
}
