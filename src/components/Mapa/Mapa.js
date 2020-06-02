import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import CapaDistritos from './CapaDistritos'

const Mapa = () => {

  const [vp, setVp] = useState({
    width: '100%',
    height: 'calc(100vh -2em)',
    bearing: 0.8438348482250375,
    pitch: 8.966012003230043,
    latitude: -33.537375678675765,
    longitude: -70.81966493085949,
    zoom: 11,
    altitude: 1.5,
  })

  const cambioEnElViewport = vp => {
    setVp({
      ...vp,
      width: '100%',
      height: 'calc(100vh -2em)'
    })
  }

  return (
    <div className="Mapa">
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={cambioEnElViewport}
      >
        <CapaDistritos />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
