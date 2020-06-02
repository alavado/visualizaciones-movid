import React from 'react'
import './Sidebar.css'
import demograficosRegiones from '../../data/demografia/regiones.json'
import { useDispatch, useSelector } from 'react-redux'
import { regionSeleccionada } from '../../redux/ducks/region'

const Sidebar = () => {

  const { codigoRegion } = useSelector(state => state.region)
  const dispatch = useDispatch()

  return (
    <div className="Sidebar">
      <div>
        <label>Región</label>
        <select
          value={codigoRegion}
          onChange={e => dispatch(regionSeleccionada(Number(e.target.value)))}
        >
          {demograficosRegiones.map(region => (
            <option value={region.codigo}>{region.nombre}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Sidebar
