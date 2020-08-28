import React from 'react'
import demograficosRegiones from '../../data/demografia/regiones.json'
import { useDispatch, useSelector } from 'react-redux'
import { regionSeleccionada } from '../../redux/ducks/region'
import { distritosUrbanosSeleccionados, distritosRuralesSeleccionados, distritosMixtosSeleccionados } from '../../redux/ducks/tiposDistritos'
import { seleccionarSemana } from '../../redux/ducks/fecha'
import { seleccionarCriterio, criterio0326, criterio0530 } from '../../redux/ducks/criterio'
import { primeraSemana, ultimaSemana } from '../../scripts/constantesMOVID'
import moment from 'moment'
import 'moment/locale/es'
import './Sidebar.css'
import './range.css'

const Sidebar = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const { criterio } = useSelector(state => state.criterio)
  const { semana } = useSelector(state => state.fecha)
  const { codigoComuna } = useSelector(state => state.distrito)
  const fechaInicio = moment('2019-12-29').add(semana - 1, 'weeks')
  const fechaInicioSemana = fechaInicio.format('DD/MM')
  const fechaTerminoSemana = fechaInicio.add(6, 'days').format('DD/MM')
  const dispatch = useDispatch()

  return (
    <div className="Sidebar">
      {/* <h1 className="Sidebar__titulo">Parámetros</h1> */}
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Región</label>
        <select
          value={codigoRegion}
          onChange={e => dispatch(regionSeleccionada(Number(e.target.value)))}
          className="Sidebar__selector"
        >
          {demograficosRegiones.map(region => (
            <option
              key={`Sidebar-opcion-region-${region.codigo}`}
              className="Sidebar__opcion"
              value={region.codigo}
            >
              {region.nombreCorto}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Comuna</label>
        <input type="text" value={codigoComuna} />
      </div> */}
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Semana epidemiológica</label>
        <div className="Sidebar__semana">
          Semana {semana}: {fechaInicioSemana} – {fechaTerminoSemana}
        </div>
        <input
          type="range"
          min={primeraSemana}
          max={ultimaSemana}
          value={semana}
          onChange={e => dispatch(seleccionarSemana(e.target.value))}
        />
      </div>
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Criterio de sospecha</label>
        <select
          value={criterio}
          onChange={e => dispatch(seleccionarCriterio(e.target.value))}
          className="Sidebar__selector"
        >
          <option
            className="Sidebar__opcion"
            value={criterio0326}
          >
            {criterio0326}
          </option>
          <option
            className="Sidebar__opcion"
            value={criterio0530}
          >
            {criterio0530}
          </option>
        </select>
      </div>
      {/* <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Tipos de distritos en mapa</label>
        <label className="Sidebar__label_checkbox">
          <input
            checked={urbanosSeleccionados}
            onChange={e => dispatch(distritosUrbanosSeleccionados(e.target.checked))}
            type="checkbox"
          />
            Urbanos
        </label>
        <label className="Sidebar__label_checkbox">
          <input
            checked={ruralesSeleccionados}
            onChange={e => dispatch(distritosRuralesSeleccionados(e.target.checked))}
            type="checkbox"
          />
            Rurales
        </label>
        <label className="Sidebar__label_checkbox">
          <input
            checked={mixtosSeleccionados}
            onChange={e => dispatch(distritosMixtosSeleccionados(e.target.checked))}
            type="checkbox"
          />
            Mixtos
        </label>
      </div> */}
    </div>
  )
}

export default Sidebar
