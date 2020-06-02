import demograficosRegiones from '../../data/demografia/regiones.json'

const seleccionar = 'region/seleccionar'

const defaultState = {
  codigoRegion: 13,
  nombreRegion: demograficosRegiones.find(r => r.codigo === 13).nombre
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case seleccionar:
      const codigoRegion = action.payload
      return {
        ...state,
        codigoRegion,
        nombreRegion: demograficosRegiones.find(r => r.codigo === codigoRegion).nombre
      }
    default: {
      return state
    }
  }
}

export function regionSeleccionada(codigoRegion) {
  return { type: seleccionar, payload: codigoRegion }
}
