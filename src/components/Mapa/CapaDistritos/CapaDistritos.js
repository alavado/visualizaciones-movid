import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import './CapaDistritos.css'
import geoJSONDistritos from '../../../data/geojson/distritos_movid.json'
import { criterio0326, criterio0530 } from '../../../redux/ducks/criterio'
import { useSelector } from 'react-redux'

const CapaDistritos = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const { semana } = useSelector(state => state.fecha)
  const { colores, valores: valoresEscala } = useSelector(state => state.escala)
  const { ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados } = useSelector(state => state.tiposDistritos)
  const { criterio } = useSelector(state => state.criterio)
  const propiedadGeoJSON = `movid-${criterio === criterio0326 ? 'sosp0326' : 'sosp0530'}-${semana}`

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
            property: propiedadGeoJSON,
            stops: colores.map((color, i) => [valoresEscala[i], color])
          }
        }}
      />
      <Layer
        id="distritos-line"
        type="line"
        paint={{
          'line-color': '#cecece',
          'line-width': .5
        }}
      />
    </Source>
  )
}

export default CapaDistritos
