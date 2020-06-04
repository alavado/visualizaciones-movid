import React from 'react'
import './HeaderMapa.css'
import { useSelector } from 'react-redux'

const HeaderMapa = () => {

  const { nombreRegion } = useSelector(state => state.region)

  return (
    <div className="HeaderMapa">
      <h2 className="HeaderMapa__nombre_region">
        {nombreRegion}
        <span className="HeaderMapa__subtitulo">Semana del lunes 01/06 al domingo 08/06</span>
      </h2>
    </div>
  )
}

export default HeaderMapa
