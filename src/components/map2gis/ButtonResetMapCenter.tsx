import { useCallback } from 'react'
import { MAP_CENTER } from './Mapgl.js'
import { useMapglContext } from './MapglContext.js'

function ButtonResetMapCenter() {
  const { mapglInstance } = useMapglContext()

  const onClick = useCallback(() => {
    if (!mapglInstance) {
      return
    }

    mapglInstance.setCenter(MAP_CENTER)
  }, [mapglInstance])

  return (
    <button style={{ height: '24px' }} onClick={onClick}>
      Reset map center
    </button>
  )
}

export default ButtonResetMapCenter
