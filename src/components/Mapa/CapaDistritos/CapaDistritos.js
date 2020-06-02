import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import './CapaDistritos.css'
import geoJSONDistritos from '../../../data/geojson/distritos.json'

const CapaDistritos = () => {

  const geoJSONProcesado = useMemo(() => ({
    ...geoJSONDistritos,
    features: geoJSONDistritos.features.filter(f => f.properties.REGION === '13').map(f => ({
      ...f,
      properties: {
        ...f.properties,
        x: Math.random()
      }
    }))
  }), [])

  return (
    <Source
      id="capa-datos-distritos"
      type="geojson"
      data={geoJSONProcesado}
    >
      <Layer
        id="distritos-fill"
        type="fill"
        paint={{
          "fill-opacity": 1,
          "fill-color": {
            property: 'x',
            stops: [
              [0, '#FFFFCE'],
              [0.25, '#C8E8B6'],
              [0.35, '#83CCBB'],
              [0.65, '#48B6C2'],
              [0.85, '#3180B6'],
              [1, '#273891']
            ]
          }//['to-color', ['at', 0, ['get', 'colores']]],
        }}
      />
      <Layer
        id="distritos-line"
        type="line"
        paint={{
          'line-color': 'rgba(255, 255, 255, 1)',
          'line-width': .5
        }}
      />
    </Source>
  )
}

export default CapaDistritos
