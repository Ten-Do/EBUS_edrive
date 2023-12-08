import styles from './App.module.css'
import Mapgl from './Mapgl.js'
import { MapglContextProvider } from './MapglContext.js'
// import ButtonRulerAddPreset from './ButtonRulerAddPreset.js'
// import ButtonResetMapCenter from './ButtonResetMapCenter.js'
// import ButtonRulerReset from './ButtonRulerReset.js'

function Map() {
  return (
    <div>
      {/* <div className={styles['App-buttons']}>
          <div className={styles['App-button-item']}>
            <ButtonRulerAddPreset />
          </div>
          <div className={styles['App-button-item']}>
            <ButtonRulerReset />
          </div>
          <div className={styles['App-button-item']}>
            <ButtonResetMapCenter />
          </div>
        </div> */}

      <div className={styles['App-map-container']}>
        <Mapgl />
      </div>
    </div>
  )
}

export default Map
