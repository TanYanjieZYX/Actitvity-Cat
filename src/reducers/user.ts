import { LOGIN } from '@act/index.ts'

interface IData {
  token: string
  user: object
}
interface IAction {
  type: string
  data: IData
}
const userReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.data.user,
        token: action.data.token
      }
    default:
      return state
  }
}

export default userReducer
