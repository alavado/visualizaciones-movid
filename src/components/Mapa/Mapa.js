import React, { useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import mapStyle from './mapStyle.json'
import './Mapa.css'
import geoJSONDistritos from '../../data/geojson/distritos.json'
import geoJSONRegiones from '../../data/geojson/regiones.json'
import geoJSONComunas from '../../data/geojson/comunas.json'

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
        <Source
          id="capa-datos-distritos"
          type="geojson"
          data={geoJSONDistritos}
        >
          <Layer
            id="distritos-fill"
            type="fill"
            paint={{
              'fill-color': 'rgba(255, 255, 255, .5)'
            }}
          />
        </Source>
      </ReactMapGL>
    </div>
  )
}

export default Mapa
