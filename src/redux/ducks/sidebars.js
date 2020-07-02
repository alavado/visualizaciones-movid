const abrirSecundaria = 'sidebars/abrirSecundaria'

const defaultState = {
  sidebarSecundariaAbierta: true
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case abrirSecundaria:
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
  return { type: abrirSecundaria, payload: 'abrir' }
}

export function cerrarSidebarSecundaria() {
  return { type: abrirSecundaria, payload: 'cerrar' }
}

export function toggleSidebarSecundaria() {
  return { type: abrirSecundaria, payload: 'toggle' }
}
