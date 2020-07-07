import React from 'react'
import { Line } from 'react-chartjs-2'
import './GraficoBarras.css'
import { primeraSemana } from '../../../scripts/constantesMOVID'

const GraficoBarras = ({ total, sospechosos }) => {

  const positividad = total.map((v, i) => 100 * (v > 0 ? (sospechosos[i] / v) : 0))

  return (
    <div className="GraficoBarras">
      <Line
        data={{
          labels: total.map((x, i) => `${primeraSemana + i}`),
          datasets: [
            {
              data: positividad,
              label: 'Positividad',
              backgroundColor: 'rgba(38, 48, 75, .8)',
              pointBackgroundColor: '#26304B',
              lineTension: 0.1
            }
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
              bottom: 6
            }
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
              scaleLabel: {
                display: true,
                labelString: 'Positividad',
                fontFamily: 'Montserrat'
              },
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

export default GraficoBarras
