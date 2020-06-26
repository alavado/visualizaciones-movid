import React from 'react'
import './CodigoColor.css'
import { useSelector } from 'react-redux'

const CodigoColor = () => {

  const { colores, valores } = useSelector(state => state.escala)

  return (
    <div className="CodigoColor">
      <h2 className="CodigoColor__titulo">Casos sospechosos</h2>
      {colores.map((color, i) => (
        <div
          className="CodigoColor__color"
          key={`codigo-color-${color}`}
        >
          <div
            className="CodigoColor__cuadrito"
            style={{ backgroundColor: color }}
          />
          <div className="CodigoColor__valor">
            {i === 0 ? 'Sin datos' : valores[i]}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CodigoColor
