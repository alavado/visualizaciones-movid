import demograficosComunas from '../data/demografia/comunas.json'

export const obtenerNombreComuna = codigo => {
  const comuna = demograficosComunas.find(c => Number(c.codigo) === Number(codigo))
  if (!comuna) {
    return '-'
  }
  return comuna.nombre
}