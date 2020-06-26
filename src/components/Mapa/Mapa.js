import React, { useState, useEffect } from 'react'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import CapaDistritos from './CapaDistritos'
import CodigoColor from './CodigoColor'
import { useSelector } from 'react-redux'
import viewportsRegiones from '../../data/viewports/regiones.json'
import { easeCubic } from 'd3-ease'

const Mapa = () => {

  const { codigoRegion } = useSelector(state => state.region)

  const [vp, setVp] = useState({
    width: '100%',
    height: 'calc(100vh -2em)',
    bearing: 0.8438348482250375,
    pitch: 8.966012003230043,
    zoom: 8,
    latitude: -33.63,
    longitude: -70.75,
    altitude: 1.5,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic,
    minZoom: 5
  })

  useEffect(() => {
    const vpRegion = viewportsRegiones.find(vp => vp.codigo === codigoRegion)
    setVp(prev => ({
      ...prev,
      ...vpRegion,
      transitionDuration: 2500,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    }))
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
      <CodigoColor />
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
