import React from 'react'
import { Source, Layer } from 'react-map-gl'
import './CapaComunas.css'
import geoJSONComunas from '../../../data/geojson/comunas.json'

const CapaComunas = () => {

  return (
    <Source
      id="capa-comunas"
      type="geojson"
      data={geoJSONComunas}
    >
      <Layer
        id="comunas-line"
        type="line"
        paint={{
          'line-color': '#888',
          'line-width': 1
        }}
      />
    </Source>
  )
}

export default CapaComunas
