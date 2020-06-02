const abrir_secundaria = 'sidebars/abrir_secundaria'

const defaultState = {
  sidebarSecundariaAbierta: true
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case abrir_secundaria:
      let sidebarSecundariaAbierta = true
      if (action.payload === 'cerrar') {
        sidebarSecundariaAbierta = false
      }
      else {
        sidebarSecundariaAbierta = !state.sidebarSecundariaAbierta
      }
      return {
        ...state,
        sidebarSecundariaAbierta
      }
    default: {
      return state
    }
  }
}

export function abrirSidebarSecundaria() {
  return { type: abrir_secundaria, payload: 'abrir' }
}

export function cerrarSidebarSecundaria() {
  return { type: abrir_secundaria, payload: 'cerrar' }
}

export function toggleSidebarSecundaria() {
  return { type: abrir_secundaria, payload: 'toggle' }
}
