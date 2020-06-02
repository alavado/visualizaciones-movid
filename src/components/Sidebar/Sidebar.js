import React from 'react'
import demograficosRegiones from '../../data/demografia/regiones.json'
import { useDispatch, useSelector } from 'react-redux'
import { regionSeleccionada } from '../../redux/ducks/region'
import { distritosUrbanosSeleccionados, distritosRuralesSeleccionados, distritosMixtosSeleccionados } from '../../redux/ducks/tiposDistritos'
import './Sidebar.css'
import './range.css'

const Sidebar = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const { ruralesSeleccionados, urbanosSeleccionados, mixtosSeleccionados } = useSelector(state => state.tiposDistritos)
  const dispatch = useDispatch()

  return (
    <div className="Sidebar">
      <h1 className="Sidebar__titulo">Parámetros de la visualización</h1>
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
      <div className="Sidebar__contenedor_parametro">
        <label className="Sidebar__label">Semana</label>
        <div className="Sidebar__semana">lunes 01/06 al domingo 08/06</div>
        <input type="range" />
      </div>
    </div>
  )
}

export default Sidebar
