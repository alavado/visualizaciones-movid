import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import './CapaDistritos.css'
import geoJSONDistritos from '../../../data/geojson/distritos_movid.json'
import { criterio0326 } from '../../../redux/ducks/criterio'
import { useSelector } from 'react-redux'

const CapaDistritos = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const { semana } = useSelector(state => state.fecha)
  const { colores, valores: valoresEscala } = useSelector(state => state.escala)
  const { ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados } = useSelector(state => state.tiposDistritos)
  const { criterio } = useSelector(state => state.criterio)
  const propiedadGeoJSON = `movid-${criterio === criterio0326 ? 'sosp0326' : 'sosp0530'}-${semana}`
  const { codigoDistrito: codigoDistritoSeleccionado } = useSelector(state => state.distrito)

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
        .map(f => ({ ...f, properties: { ...f.properties, p: f.properties[`movid-obs-${semana}`] > 0 ? (100 * f.properties[propiedadGeoJSON] / f.properties[`movid-obs-${semana}`]) : -1 }}))
    }
  }, [codigoRegion, ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados, semana, propiedadGeoJSON])

  const geoJSONDistritoSeleccionado = useMemo(() => {
    return {
      ...geoJSONDistritos,
      features: geoJSONDistritos.features
        .filter(f => Number(f.properties.CODIGO_C17) === codigoDistritoSeleccionado)
    }
  }, [codigoDistritoSeleccionado])

  return (
    <>
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
              property: 'p',
              stops: colores.map((color, i) => [valoresEscala[i], color])
            }
          }}
        />
        <Layer
          id="distritos-line"
          type="line"
          paint={{
            'line-color': '#a9a9a9',
            'line-width': .75,
            'line-dasharray': [2, 1]
          }}
        />
      </Source>
      <Source
        id="capa-distrito-seleccionado"
        type="geojson"
        data={geoJSONDistritoSeleccionado}
      >
        <Layer
          id="distrito-seleccionado-line"
          type="line"
          paint={{
            'line-color': '#26304B',
            'line-width': 3,
            'line-dasharray': [2, 1]
          }}
        />
      </Source>
    </>
  )
}

export default CapaDistritos
