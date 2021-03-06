import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import { useSelector } from 'react-redux'
import './CapaComunas.css'
import geoJSONComunas from '../../../data/geojson/comunas.json'

const CapaComunas = () => {

  const { codigoRegion } = useSelector(state => state.region)

  const geoJSONComunasRegion = useMemo(() => {
    return {
      ...geoJSONComunas,
      features: geoJSONComunas
        .features
        .filter(f => f.properties.codigoRegion === codigoRegion)
    }
  }, [codigoRegion])  

  return (
    <Source
      id="capa-comunas"
      type="geojson"
      data={geoJSONComunasRegion}
    >
      <Layer
        id="comunas-line"
        type="line"
        paint={{
          'line-color': '#424242',
          'line-width': 1
        }}
      />
    </Source>
  )
}

export default CapaComunas
