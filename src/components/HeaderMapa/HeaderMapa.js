import React from 'react'
import './HeaderMapa.css'
import { useSelector } from 'react-redux'

const HeaderMapa = () => {

  const { nombreRegion } = useSelector(state => state.region)

  return (
    <div className="HeaderMapa">
      <h2 className="HeaderMapa__nombre_region">{nombreRegion}</h2>
    </div>
  )
}

export default HeaderMapa
