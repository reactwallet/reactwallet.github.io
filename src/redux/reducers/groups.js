import { uniqueId } from '../../lib/helpers'

const initialState = [
  'Cash',
  'Cards & Bank Accounts',
  'Debts',
  'Investments',
  'Others'
].map((name) => ({
  id: uniqueId(),
  name
}))

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_GROUP': {
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          return {
            ...group,
            collapsed: action.payload.collapsed
          }
        }
        return group
      })
    }

    default:
      return state
  }
}