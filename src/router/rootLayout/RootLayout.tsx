import Map from '../../components/map2gis/Map.js'
import { MapglContextProvider } from '../../components/map2gis/MapglContext.js'
import { Navbar } from '../../components/navbar/Navbar.js'
import { RoutesPage } from '../../pages/routes/RoutesPage.js'
import styles from './styles.module.css'

export const RootLayout = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <MapglContextProvider>
        <div className={styles.content}>
          <div className={styles.map_container}>
            <Map />
          </div>
          <RoutesPage />
        </div>
      </MapglContextProvider>
    </div>
  )
}
