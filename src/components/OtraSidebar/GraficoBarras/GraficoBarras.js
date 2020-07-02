import React from 'react'
import { Bar } from 'react-chartjs-2'
import './GraficoBarras.css'
import { primeraSemana } from '../../../scripts/constantesMOVID'

const GraficoBarras = ({ total, sospechosos }) => {

  console.log(total)

  return (
    <div className="GraficoBarras">
      <Bar
        data={{
          labels: total.map((x, i) => `S${primeraSemana + i}`),
          datasets: [
            {
              data: total,
              label: 'Encuestas recibidas',
              backgroundColor: '#26304B'
            },
            {
              data: sospechosos,
              label: 'Casos sospechosos',
              backgroundColor: '#7789bb'
            },
          ]
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                zeroLineWidth: 0
              }
            }],
            yAxes: [{
              gridLines: {
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default GraficoBarras
