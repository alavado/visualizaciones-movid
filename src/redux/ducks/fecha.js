const retroceder = 'fecha/retroceder'
const seleccionar = 'fecha/seleccionar'

export default function reducer(state = { fecha: 0, semana: 18 }, action = {}) {
  switch (action.type) {
    case retroceder:
      return {
        ...state,
        fecha: state.fecha - 1
      }
    case seleccionar:
      return {
        ...state,
        semana: action.payload
      }
    default: {
      return state
    }
  }
}

export const seleccionarSemana = semana => {
  return { type: seleccionar, payload: Number(semana) }
}

export function retrocederFecha() {
  return { type: retroceder }
}
