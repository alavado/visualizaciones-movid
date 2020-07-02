import React, { useMemo } from 'react'
import './OtraSidebar.css'
import { useSelector } from 'react-redux'
import geoJSONDistritos from '../../data/geojson/distritos_movid.json'
import { primeraSemana, ultimaSemana } from '../../scripts/constantesMOVID'
import { criterio0326 } from '../../redux/ducks/criterio'
import GraficoBarras from './GraficoBarras'

const OtraSidebar = () => {

  const { sidebarSecundariaAbierta } = useSelector(state => state.sidebars)
  const { codigoRegion, nombreRegion } = useSelector(state => state.region)
  const { codigoComuna, codigoDistrito } = useSelector(state => state.distrito)
  const { criterio: nombreCriterio } = useSelector(state => state.criterio)
  const numeroSemanas = ultimaSemana - primeraSemana + 1
  const criterio = nombreCriterio === criterio0326 ? 'sosp0326' : 'sosp0530'

  const { datosRegion, datosComuna, datosDistrito } = useMemo(() => {
    const distritosRegion = geoJSONDistritos
      .features
      .filter(f => Number(f.properties.REGION) === codigoRegion)
    const datosRegion = distritosRegion.reduce((sumas, distrito) => {
      for (let i = primeraSemana; i <= ultimaSemana; i++) {
        if (distrito.properties[`movid-${criterio}-${i}`] > 0) {
          sumas.total[i - primeraSemana] += distrito.properties[`movid-obs-${i}`]
          sumas.sospechosos[i - primeraSemana] += distrito.properties[`movid-${criterio}-${i}`]
        }
      }
      return sumas
    }, { total: Array(numeroSemanas).fill(0), sospechosos: Array(numeroSemanas).fill(0) })
    let datosComuna = { total: undefined, sospechosos: undefined }
    if (codigoComuna) {
      datosComuna = distritosRegion
        .filter(d => Number(d.properties.COMUNA) === codigoComuna)
        .reduce((sumas, distrito) => {
          for (let i = primeraSemana; i <= ultimaSemana; i++) {
            if (distrito.properties[`movid-${criterio}-${i}`] > 0) {
              sumas.total[i - primeraSemana] += distrito.properties[`movid-obs-${i}`]
              sumas.sospechosos[i - primeraSemana] += distrito.properties[`movid-${criterio}-${i}`]
            }
          }
          return sumas
        }, { total: Array(numeroSemanas).fill(0), sospechosos: Array(numeroSemanas).fill(0) })
    }
    let datosDistrito = { total: undefined, sospechosos: undefined }
    if (codigoDistrito) {
      datosDistrito = distritosRegion
        .filter(d => Number(d.properties.CODIGO_C17) === codigoDistrito)
        .reduce((sumas, distrito) => {
          for (let i = primeraSemana; i <= ultimaSemana; i++) {
            if (distrito.properties[`movid-${criterio}-${i}`] > 0) {
              sumas.total[i - primeraSemana] += distrito.properties[`movid-obs-${i}`]
              sumas.sospechosos[i - primeraSemana] += distrito.properties[`movid-${criterio}-${i}`]
            }
          }
          return sumas
        }, { total: Array(numeroSemanas).fill(0), sospechosos: Array(numeroSemanas).fill(0) })
    }
    return { datosRegion, datosComuna, datosDistrito }
  }, [codigoRegion, numeroSemanas, criterio, codigoComuna, codigoDistrito])

  return (
    <div className={`OtraSidebar${sidebarSecundariaAbierta ? ' OtraSidebar--abierta' : ''}`}>
      <h1 className="OtraSidebar__titulo">{nombreRegion}</h1>
      <GraficoBarras
        total={datosRegion.total}
        sospechosos={datosRegion.sospechosos}
      />
      <h1 className="OtraSidebar__titulo" style={{ display: datosComuna.total ? 'block' : 'none' }}>Comuna</h1>
      <GraficoBarras
        total={datosComuna.total}
        sospechosos={datosComuna.sospechosos}
      />
      <h1 className="OtraSidebar__titulo" style={{ display: datosComuna.total ? 'block' : 'none' }}>Distrito</h1>
      <GraficoBarras
        total={datosDistrito.total}
        sospechosos={datosDistrito.sospechosos}
      />
    </div>
  )
}

export default OtraSidebar
