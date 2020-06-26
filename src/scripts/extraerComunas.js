const fs = require('fs')
const geoJSONDistritos = require('../data/geojson/distritos.json')
const turf = require('turf')

const unirDistritos = distritos => {
  let poligonoInicial
  for (let i = 0; i < distritos.length; i++) {
    try {
      poligonoInicial = turf.polygon(distritos[i].coordinates)
      break
    }
    catch (err) {
      continue
    }
  }
  try {
    return distritos.reduce((prev, distrito) => {
      try {
        return turf.union(prev, turf.polygon(distrito.coordinates))
      } catch (err) {
        return prev
      }
    }, poligonoInicial)
  } catch(err) {
    return distritos[0]
  }
}

const comunas = geoJSONDistritos.features.reduce((obj, d) => ({
  ...obj,
  [d.properties.COMUNA]:
    obj[d.properties.COMUNA] ?
      [...obj[d.properties.COMUNA], d.geometry] :
      [d.geometry]
}), {})

const geoJSONComunas = {
  type: 'FeatureCollection',
  features: Object.keys(comunas).map(c => {
    return {
      ...unirDistritos(comunas[c]),
      properties: {
        codigo: Number(c)
      }
    }
  })
}

fs.writeFile(
  '../data/geojson/comunas.json',
  JSON.stringify(geoJSONComunas),
  err => console.log(err)
)
