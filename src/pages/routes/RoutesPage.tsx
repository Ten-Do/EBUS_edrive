import { useEffect, useState } from 'react'
import { useMapglContext } from '../../components/map2gis/MapglContext.js'
import styles from './styles.module.css'
import { Clusterer } from '@2gis/mapgl-clusterer'
import { useKeycloak } from '@react-keycloak/web'
import $api from '../../http/api.ts'
import { IRout } from '../../types/rout.ts'
import { decodePath } from '../../utils/decodeRout.ts'
import { Button } from '../../UI/button/button.js'
import { Chat } from '../../components/chat/Chat.js'
import { RecoilRoot } from 'recoil'
import { ChatPage } from '../chat/ChatPage.js'

const foo = (
  stations: {
    ID: number
    Name: string
    Lat: number
    Lon: number
    Routes: any
  }[],
  station_name: string,
) => {
  for (let i = 0; i < stations.length; i++) {
    if (stations[i].Name === station_name) return true
  }
  return false
}

export const RoutesPage = () => {
  const { mapglInstance, mapgl } = useMapglContext()
  const { keycloak } = useKeycloak()
  const [route, setRoute] = useState<IRout | null>(null)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    $api
      .get('bus', 'route/', keycloak.token!)
      .then(data => data.data)
      .then(data => {
        setRoute(data.Routes.filter(r => r.Number == 228)[0])
      })
  }, [])

  useEffect(() => {
    if (!route || !mapglInstance || !mapgl) return
    const clusterer = new Clusterer(mapglInstance, {
      radius: 10,
    })
    const polyline = new mapgl.Polyline(mapglInstance, {
      coordinates: decodePath(route.Path),
      width: 5,
      color: '#0029ff',
    })
    fetch('../../../public/bus_stop_points.json')
      .then(res => res.json())
      .then(data => data.filter(stop => foo(route.Stations, stop.userData)))
      .then(data => {
        clusterer!.load(data)
      })

    return () => {
      clusterer && clusterer.destroy()
      polyline && polyline.destroy()
    }
  }, [route, mapglInstance, mapgl])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '36px',
        right: '36px',
        zIndex: 100,
      }}
    >
      <RecoilRoot>
        {showChat && <ChatPage close={() => setShowChat(false)} />}
        {!showChat && (
          <Button bg='primary' clickHandler={() => setShowChat(true)}>
            Открыть чат
          </Button>
        )}
      </RecoilRoot>
    </div>
  )
}
