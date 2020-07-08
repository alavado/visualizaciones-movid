import React, { useMemo } from 'react'
import './OtraSidebar.css'
import { useSelector } from 'react-redux'
import geoJSONDistritos from '../../data/geojson/distritos_movid.json'
import { primeraSemana, ultimaSemana } from '../../scripts/constantesMOVID'
import { criterio0326 } from '../../redux/ducks/criterio'
import GraficoPositividad from './GraficoPositividad'
import { obtenerNombreComuna } from '../../helpers/demografia'

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
    let datosComuna = { total: Array(numeroSemanas).fill(0), sospechosos: Array(numeroSemanas).fill(0) }
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
        }, datosComuna)
    }
    let datosDistrito = { total: Array(numeroSemanas).fill(0), sospechosos: Array(numeroSemanas).fill(0) }
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
        }, datosDistrito)
    }
    return { datosRegion, datosComuna, datosDistrito }
  }, [codigoRegion, numeroSemanas, criterio, codigoComuna, codigoDistrito])

  return (
    <div className={`OtraSidebar${sidebarSecundariaAbierta ? ' OtraSidebar--abierta' : ''}`}>
      <h1 className="OtraSidebar__titulo">Positividad</h1>
      <GraficoPositividad
        datosRegion={datosRegion.total.map((v, i) => 100 * (v > 0 ? (datosRegion.sospechosos[i] / v) : 0))}
        datosComuna={datosComuna.total.map((v, i) => 100 * (v > 0 ? (datosComuna.sospechosos[i] / v) : 0))}
        datosDistrito={datosDistrito.total.map((v, i) => 100 * (v > 0 ? (datosDistrito.sospechosos[i] / v) : 0))}
      />
    </div>
  )
}

export default OtraSidebar
