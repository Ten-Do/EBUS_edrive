import { useContext, useEffect, useState } from 'react'
import { load } from '@2gis/mapgl'
import { useMapglContext } from './MapglContext.js'
// import { Clusterer } from '@2gis/mapgl-clusterer'
import { RulerControl } from '@2gis/mapgl-ruler'
import { Directions } from '@2gis/mapgl-directions'
import { useControlRotateClockwise } from './useControlRotateClockwise.js'
import { ControlRotateCounterclockwise } from './ControlRotateConterclockwise.js'
import { MapWrapper } from './MapWrapper.js'
import { BusMarker } from '../../UI/markers/Bus.tsx'
import { HtmlMarker } from '@2gis/mapgl/types/index.js'
import { CentrifugoContext } from '../../Auth.tsx'

export const MAP_CENTER = [37.623082, 55.75254]

export default function Mapgl() {
  const centrifuge = useContext(CentrifugoContext);
  const { setMapglContext } = useMapglContext()
  const [map1, setMap] = useState(null);
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    if (centrifuge && map1) {
      const newSub = centrifuge.newSubscription("geo:public");
      newSub.on('publication', function (ctx) {
        setBuses(buses => {
          const busIndex = buses.findIndex(bus => bus.ID === ctx.data.ID);
  
          if (busIndex >= 0) {
            // Автобус уже существует, обновляем его данные
            const updatedBuses = [...buses];
            updatedBuses[busIndex] = {
              ...updatedBuses[busIndex],
              Battery: ctx.data.Battery,
              driverID: ctx.data.DriverID
            };
            updatedBuses[busIndex].marker.setCoordinates([ctx.data.Lon, ctx.data.Lat])
            return updatedBuses;
          } else {
            // Автобус новый, добавляем его в список
            const newBus = {
              ID: ctx.data.ID,
              marker: new mapgl.HtmlMarker(map1, {
                coordinates: [ctx.data.Lon, ctx.data.Lat],
                html: BusMarker(ctx.data.ID),
              }),
              Battery: ctx.data.Battery,
              driverID: ctx.data.DriverID
            };
            return [...buses, newBus];
          }
        });
      });
      newSub.subscribe();
  
      // Функция очистки
      return () => {
        newSub.unsubscribe();
        centrifuge.removeSubscription(newSub);
      };
    }
  }, [centrifuge, map1]);
  useEffect(() => {
    let map: mapgl.Map | undefined = undefined
    let directions: Directions | undefined = undefined
    let htmlMarker: HtmlMarker | undefined = undefined
    // let clusterer: Clusterer | undefined = undefined

    load().then(mapgl => {
      map = new mapgl.Map('map-container', {
        center: MAP_CENTER,
        zoom: 13,
        key: 'a1893935-6834-4445-b97a-3405fb426c5b',
      })
      setMap(map);

      /**
       * Ruler  plugin
       */

      const rulerControl = new RulerControl(map, { position: 'centerRight' })


      /**
       * Directions plugin
       */

      directions = new Directions(map, {
        directionsApiKey: 'rujany4131', // It's just demo key
      })
      // setInterval(
      //   () =>
      //     htmlMarker?.setCoordinates([
      //       htmlMarker.getCoordinates()[0] + 0.00001,
      //       htmlMarker.getCoordinates()[1],
      //     ]),
      //   10,
      // )
      // directions.carRoute({
      //   points: [
      //     [37.623082, 55.75454],
      //     [37.623082, 55.75254],
      //   ],
      // })

      setMapglContext({
        mapglInstance: map,
        rulerControl,
        mapgl,
      })
    })

    // Destroy the map, if Map component is going to be unmounted
    return () => {
      directions && directions.clear()
      htmlMarker && htmlMarker.destroy()
      // clusterer && clusterer.destroy()
      map && map.destroy()
      setMapglContext({ mapglInstance: undefined, mapgl: undefined })
    }
  }, [setMapglContext])

  useControlRotateClockwise()

  return (
    <>
      <MapWrapper />
      <ControlRotateCounterclockwise />
    </>
  )
}
