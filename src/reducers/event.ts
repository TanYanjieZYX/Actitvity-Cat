import { GET_ALL_EVENTS, GET_EVENTS, SHOW_ALL_EVENTS, ADD_RESULT_EVENTS } from '@act/index.ts'
interface IAction {
  type: string
  events: any[]
  hasMore: boolean
}
const eventReducer = (
  state = { all_list: [], all_hasMore: false, result_list: [], result_hasMore: false },
  action: IAction
) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        all_list: action.events,
        all_hasMore: action.hasMore,
        result_list: action.events,
        result_hasMore: action.hasMore
      }
    case GET_EVENTS:
      return {
        ...state,
        result_list: action.events,
        result_hasMore: action.hasMore
      }
    case SHOW_ALL_EVENTS:
      return {
        ...state,
        result_list: state.all_list,
        result_hasMore: state.all_hasMore
      }
    case ADD_RESULT_EVENTS:
      return {
        ...state,
        result_list: [...state.result_list, ...action.events],
        result_hasMore: action.hasMore && action.events.length > 0
      }
    default:
      return state
  }
}

export default eventReducer
