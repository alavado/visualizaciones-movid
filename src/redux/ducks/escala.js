const cambiar = 'escala/cambiar'

const defaultState = {
  colores: [
    '#cecece',
    '#FFFFCE',
    '#C8E8B6',
    '#83CCBB',
    '#48B6C2',
    '#3180B6',
    '#273891'
  ],
  valores: [-1, 0, 2, 4, 6, 8, 10]
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case cambiar:
      return {
        ...state,
        colores: action.payload
      }
    default: {
      return state
    }
  }
}
