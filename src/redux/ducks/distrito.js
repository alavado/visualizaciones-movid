const seleccionar = 'distrito/seleccionar'

const defaultState = {
  codigoRegion: undefined,
  codigoComuna: undefined,
  codigoDistrito: undefined
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case seleccionar:
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state
    }
  }
}

export const seleccionaDistrito = featureDistrito => {
  const { REGION, COMUNA, CODIGO_C17 } = featureDistrito.properties
  return {
    type: seleccionar,
    payload: {
      codigoRegion: Number(REGION),
      codigoComuna: Number(COMUNA),
      codigoDistrito: Number(CODIGO_C17)
    }
  }
}
