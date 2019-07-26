interface IAction {
  type: string
  channels?: any[]
  text?: string
  params?: string
}
const searchReducer = (
  state = { show: false, channels: [], result_show: false, text: '', params: '' },
  action: IAction
) => {
  switch (action.type) {
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        show: !state.show
      }
    case 'GET_CHANNELS':
      return {
        ...state,
        channels: action.channels
      }
    case 'FINISH_SEARCH':
      return {
        ...state,
        show: false,
        result_show: true,
        text: action.text,
        params: action.params
      }
    case 'CLEAR_SEARCH':
      return {
        ...state,
        show: false,
        result_show: false
      }
    default:
      return state
  }
}

export default searchReducer
