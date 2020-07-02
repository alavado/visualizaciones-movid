import React, { useMemo } from 'react'
import './OtraSidebar.css'
import { useSelector } from 'react-redux'
import geoJSONDistritos from '../../data/geojson/distritos_movid.json'
import { primeraSemana, ultimaSemana } from '../../scripts/constantesMOVID'
import { criterio0326 } from '../../redux/ducks/criterio'

const OtraSidebar = () => {

  const { sidebarSecundariaAbierta } = useSelector(state => state.sidebars)
  const { codigoRegion, nombreRegion } = useSelector(state => state.region)
  const { criterio: nombreCriterio } = useSelector(state => state.criterio)
  const numeroSemanas = ultimaSemana - primeraSemana + 1
  const criterio = nombreCriterio === criterio0326 ? 'sosp0326' : 'sosp0530'

  const { totalRegion, positivosRegion } = useMemo(() => {
    const distritosRegion = geoJSONDistritos
      .features
      .filter(f => Number(f.properties.REGION) === codigoRegion)
    return distritosRegion.reduce((sumas, distrito) => {
      for (let i = primeraSemana; i <= ultimaSemana; i++) {
        if (distrito.properties[`movid-${criterio}-${i}`] > 0) {
          sumas.totalRegion[i - primeraSemana] += distrito.properties[`movid-obs-${i}`]
          sumas.positivosRegion[i - primeraSemana] += distrito.properties[`movid-${criterio}-${i}`]
        }
      }
      return sumas
    }, { totalRegion: Array(numeroSemanas).fill(0), positivosRegion: Array(numeroSemanas).fill(0) })
  }, [codigoRegion, numeroSemanas, criterio])

  console.log(totalRegion)
  console.log(positivosRegion)
  
  return (
    <div className={`OtraSidebar${sidebarSecundariaAbierta ? ' OtraSidebar--abierta' : ''}`}>
      <h1>{nombreRegion}</h1>
      
    </div>
  )
}

export default OtraSidebar
