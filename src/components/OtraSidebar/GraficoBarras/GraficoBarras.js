import React from 'react'
import { Bar } from 'react-chartjs-2'
import './GraficoBarras.css'
import { primeraSemana } from '../../../scripts/constantesMOVID'

const GraficoBarras = ({ total, sospechosos }) => {

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
          legend: {
            display: false
          },
          layout: {
            padding: {
              top: 16,
              bottom: 4
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                zeroLineWidth: 0
              },
              ticks: {
                fontFamily: 'Montserrat',
                fontSize: 10
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                suggestedMin: 0,
                suggestedMax: 10,
                fontFamily: 'Montserrat',
                fontSize: 10
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default GraficoBarras
