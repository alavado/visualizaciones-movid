const fs = require('fs')
const geoJSONDistritos = require('../data/geojson/distritos.json')
const { primeraSemana, ultimaSemana } = require('./constantesMOVID')

fs.readFile('../data/movid/movid19_freq_c17.csv', (err, data) => {
  if (err) {
    console.error(err)
  }
  const lineas = `${data}`.split('\n')
  const datosMOVID = lineas
    .filter(linea => linea.length > 3)
    .map(linea => {
      const datos = linea.split(',')
      return {
        codigoComuna: datos[1].slice(1, -1),
        codigoDistrito: datos[2].slice(1, -1),
        semana: Number(datos[3].slice(1, -1)),
        sosp_minsal0326: Number(datos[4]),
        sosp_minsal0530: Number(datos[5]),
        obs_cnt: Number(datos[6])
      }
  })
  const geoJSON = {
    ...geoJSONDistritos,
    features: [
      ...geoJSONDistritos.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...Array(ultimaSemana - primeraSemana + 1)
            .fill(0)
            .reduce((obj, n, i) => ({
              ...obj,
              [`movid-obs-${i + primeraSemana}`]: -1,
              [`movid-sosp0326-${i + primeraSemana}`]: -1,
              [`movid-sosp0530-${i + primeraSemana}`]: -1,
              [`movid-posit0326-${i + primeraSemana}`]: -1,
              [`movid-posit0530-${i + primeraSemana}`]: -1
            }), {}),
          ...datosMOVID
            .filter(d => d.codigoDistrito === feature.properties.CODIGO_C17)
            .reduce((obj, d) => ({
              ...obj,
              [`movid-obs-${d.semana}`]: d.obs_cnt,
              [`movid-sosp0326-${d.semana}`]: d.sosp_minsal0326,
              [`movid-sosp0530-${d.semana}`]: d.sosp_minsal0530,
              [`movid-posit0326-${d.semana}`]: d.obs_cnt > 0 ? (100 * d.sosp_minsal0326 / d.obs_cnt) : -1,
              [`movid-posit0530-${d.semana}`]: d.obs_cnt > 0 ? (100 * d.sosp_minsal0530 / d.obs_cnt) : -1
            }), {})
        }
      }))
    ]
  }
  fs.writeFile('../data/geojson/distritos_movid.json', JSON.stringify(geoJSON), err => console.log(err))
})