import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import './CapaDistritos.css'
import geoJSONDistritos from '../../../data/geojson/distritos.json'
import { useSelector } from 'react-redux'

const CapaDistritos = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const { colores, valores: valoresEscala } = useSelector(state => state.escala)
  const { ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados } = useSelector(state => state.tiposDistritos)

  const geoJSONProcesado = useMemo(() => {
    const codigo = codigoRegion.toString()
    return {
      ...geoJSONDistritos,
      features: geoJSONDistritos
        .features
        .filter(f => f.properties.REGION === codigo)
        .filter(f => (
          (ruralesSeleccionados || f.properties.TIPO_DISTR !== 'RURAL') &&
          (urbanosSeleccionados || f.properties.TIPO_DISTR !== 'URBANO') &&
          (mixtosSeleccionados || f.properties.TIPO_DISTR !== 'MIXTO')
        ))
        .map(f => ({
          ...f,
          properties: {
            ...f.properties,
            x: Math.random()
          }
        }))
    }
  }, [codigoRegion, ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados])

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
            stops: colores.map((color, i) => [valoresEscala[i], color])
          }
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
