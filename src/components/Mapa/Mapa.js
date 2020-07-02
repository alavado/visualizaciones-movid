import React, { useState, useEffect } from 'react'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import CapaDistritos from './CapaDistritos'
import CodigoColor from './CodigoColor'
import { useSelector, useDispatch } from 'react-redux'
import viewportsRegiones from '../../data/viewports/regiones.json'
import { easeCubic } from 'd3-ease'
import CapaComunas from './CapaComunas'
import { seleccionaDistrito } from '../../redux/ducks/distrito'

const Mapa = () => {

  const { codigoRegion } = useSelector(state => state.region)
//https://api.maptiler.com/geocoding/lord%20cochrane.json?key=9sVe3g7n8Rv4JJBJXlbK&language=es&bbox=-75.6443953112,-55.61183,-66.95992,-17.5800118954
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
  const dispatch = useDispatch()

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

  const clickEnMapa = e => {
    const feature = e.features.find(f => f.layer.id === 'distritos-fill')
    if (feature) {
      dispatch(seleccionaDistrito(feature))
    }
  }

  return (
    <div className="Mapa">
      <CodigoColor />
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={cambioEnElViewport}
        onClick={clickEnMapa}
        doubleClickZoom={false}
      >
        <CapaDistritos />
        <CapaComunas />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
