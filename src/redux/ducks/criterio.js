const seleccionar = 'escala/seleccionar'

export const criterio0326 = 'Criterio MINSAL 26/03'
export const criterio0530 = 'Criterio MINSAL 30/05'

const defaultState = {
  criterio: criterio0326
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case seleccionar:
      return {
        ...state,
        criterio: action.payload
      }
    default: {
      return state
    }
  }
}

export const seleccionarCriterio = criterio => {
  return { type: seleccionar, payload: criterio }
}
