import React, { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import CapaDistritos from './CapaDistritos'
import { useSelector } from 'react-redux'
import viewportsRegiones from '../../data/viewports/regiones.json'

const Mapa = () => {

  const { codigoRegion } = useSelector(state => state.region)

  const [vp, setVp] = useState({
    width: '100%',
    height: 'calc(100vh -2em)',
    bearing: 0.8438348482250375,
    pitch: 8.966012003230043,
    latitude: -33.64742712189228,
    longitude: -70.7013929922199,
    zoom: 7.917019088207824,
    altitude: 1.5,
  })

  useEffect(() => {
    const vpRegion = viewportsRegiones.find(vp => vp.codigo === codigoRegion)
    setVp(prev => ({ ...prev, ...vpRegion }))
  }, [codigoRegion])

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
