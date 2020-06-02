const retroceder = 'fecha/retroceder'

export default function reducer(state = { fecha: 0 }, action = {}) {
  switch (action.type) {
    case retroceder:
      return {
        ...state,
        fecha: state.fecha - 1
      }
    default: {
      return state
    }
  }
}

export function retrocederFecha() {
  return { type: retroceder }
}
