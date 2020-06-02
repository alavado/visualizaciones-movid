import React from 'react'
import { Source, Layer } from 'react-map-gl'
import './CapaDistritos.css'
import geoJSONDistritos from '../../../data/geojson/distritos.json'

const CapaDistritos = () => {

  return (
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
  )
}

export default CapaDistritos
