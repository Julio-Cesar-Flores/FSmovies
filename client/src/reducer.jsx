export const iniState = {
  peticion: '',
  petTransito: '',
  token: ''
}

export const stateReducer = (state, action) => {
  switch (action.type) {
    case 'INICIO':
      return {
        ...state,
        peticion: '',
        petTransito: ''
      }
    case 'BUSCANDO':
      return {
        ...state,
        petTransito: state.peticion
      }
    case 'BUSCA_SERIE':
      return {
        ...state,
        peticion: 'S',
        petTransito: '',
        idSerie: 0,
        dataEpisodios: [],
        dataCast: []
      }
    case 'SET_DATA_S': // Data Serie
      return {
        ...state,
        peticion: '',
        petTransito: '',
        dataSeries: action.payload,
        dataEpisodios: [],
        dataCast: []
      }
    default:
      throw new Error()
  }
}
