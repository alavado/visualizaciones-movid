const seleccionarTipo = 'distritos/seleccionar_tipo'

const defaultState = {
  urbanosSeleccionados: true,
  ruralesSeleccionados: true,
  mixtosSeleccionados: true,
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case seleccionarTipo:
      const { tipo, estado } = action.payload
      return {
        ...state,
        [`${tipo}Seleccionados`]: estado
      }
    default: {
      return state
    }
  }
}

export function distritosRuralesSeleccionados(estado) {
  return { type: seleccionarTipo, payload: { tipo: 'rurales', estado } }
}

export function distritosUrbanosSeleccionados(estado) {
  return { type: seleccionarTipo, payload: { tipo: 'urbanos', estado } }
}

export function distritosMixtosSeleccionados(estado) {
  return { type: seleccionarTipo, payload: { tipo: 'mixtos', estado } }
}
