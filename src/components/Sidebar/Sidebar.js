import React from 'react'
import './Sidebar.css'
import demograficosRegiones from '../../data/demografia/regiones.json'
import { useDispatch, useSelector } from 'react-redux'
import { regionSeleccionada } from '../../redux/ducks/region'
import { distritosUrbanosSeleccionados, distritosRuralesSeleccionados, distritosMixtosSeleccionados } from '../../redux/ducks/distritos'

const Sidebar = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const { ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados } = useSelector(state => state.distritos)
  const dispatch = useDispatch()

  return (
    <div className="Sidebar">
      <h1 className="Sidebar__titulo">Opciones</h1>
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Fecha</label>
      </div>
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Región</label>
        <select
          value={codigoRegion}
          onChange={e => dispatch(regionSeleccionada(Number(e.target.value)))}
          className="Sidebar__selector"
        >
          {demograficosRegiones.map(region => (
            <option
              className="Sidebar__opcion"
              value={region.codigo}
            >
              {region.nombreCorto}
            </option>
          ))}
        </select>
      </div>
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Tipos de distritos</label>
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
      </div>
    </div>
  )
}

export default Sidebar
