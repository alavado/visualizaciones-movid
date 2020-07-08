import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficoPositividad.css'
import { primeraSemana } from '../../../scripts/constantesMOVID'

const GraficoPositividad = ({ datosRegion, datosComuna, datosDistrito }) => {

  return (
    <div className="GraficoPositividad">
      <Line
        data={{
          labels: datosRegion.map((x, i) => `${primeraSemana + i}`),
          datasets: [
            {
              data: datosRegion,
              label: 'Región',
              borderColor: '#26304B',
              pointBackgroundColor: '#26304B',
              pointRadius: 2,
              borderWidth: 1.5,
              lineTension: 0.1,
              fill: false
            },
            {
              data: datosComuna,
              label: 'Comuna',
              borderColor: '#5C6B96',
              pointBackgroundColor: '#5C6B96',
              pointRadius: 2,
              borderWidth: 1.5,
              lineTension: 0.1,
              fill: false
            },
            {
              data: datosDistrito,
              label: 'Distrito',
              borderColor: '#96792F',
              pointBackgroundColor: '#96792F',
              pointRadius: 2,
              borderWidth: 1.5,
              lineTension: 0.1,
              spanGaps: [5, 5],
              fill: false
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          tooltips: {
            callbacks: {
              title: (item, data) => `Semana ${item[0].label}`,
              label: (item, data) => (
                `Positividad: ${Number(item.value)
                  .toLocaleString('de-DE', { maximumFractionDigits: 1 })}%`
              )
            }
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Semana',
                fontFamily: 'Montserrat'
              },
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
                suggestedMax: 30,
                fontFamily: 'Montserrat',
                fontSize: 10,
                callback: v => `${v}%`
              },
              gridLines: {
                color: '#f0f0f0'
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default GraficoPositividad
