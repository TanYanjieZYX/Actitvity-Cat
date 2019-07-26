interface IAction {
  type: string
  error?: string
}
const errorReducer = (state = { show: false }, action: IAction) => {
  switch (action.type) {
    case 'SHOW_ERROR':
      return {
        show: true,
        msg: action.error
      }
    case 'HIDE_ERROR':
      return {
        show: false,
        msg: ''
      }
    default:
      return state
  }
}

export default errorReducer
