import React from 'react'
import './CodigoColor.css'
import { useSelector } from 'react-redux'

const CodigoColor = () => {

  const { colores, valores } = useSelector(state => state.escala)

  return (
    <div className="CodigoColor">
      {colores.slice(1).map((color, i) => (
        <div className="CodigoColor__color" key={`codigo-color-${color}`}>
          <div className="CodigoColor__cuadrito" style={{ backgroundColor: color }} />
          <div className="CodigoColor__valor">{valores[i + 1]}</div>
        </div>
      ))}
    </div>
  )
}

export default CodigoColor
