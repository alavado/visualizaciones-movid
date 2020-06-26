import React from 'react'
import './HeaderMapa.css'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

const HeaderMapa = () => {

  const { nombreRegion } = useSelector(state => state.region)
  const { semana } = useSelector(state => state.fecha)
  const fechaInicio = moment('2019-12-29').add(semana - 1, 'weeks')
  const fechaInicioSemana = fechaInicio.format('dddd D [de] MMMM')
  const fechaTerminoSemana = fechaInicio.add(6, 'days').format('dddd D [de] MMMM')

  return (
    <div className="HeaderMapa">
      <h2 className="HeaderMapa__nombre_region">
        {nombreRegion}
        <span className="HeaderMapa__subtitulo">
          Semana epidemiológica {semana}, del {fechaInicioSemana} al {fechaTerminoSemana}
        </span>
      </h2>
    </div>
  )
}

export default HeaderMapa
