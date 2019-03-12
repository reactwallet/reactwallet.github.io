import { combineReducers } from 'redux'
import { uniqueId } from '../../lib/helpers'

// This initialState is used to populate the groups store for the first time,
// then it goes to the localStorage and will be loaded from there afterwards
const initialState = [
  'Cash',
  'Cards & Bank Accounts',
  'Debts',
  'Investments',
  'Others'
].reduce((res, name) => {
  const id = uniqueId()
  res.byId[id] = {
    id,
    name
  }
  res.allIds.push(id)
  return res
}, {
  byId: {},
  allIds: []
})

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case 'TOGGLE_GROUP': {
      return {
        ...state,
        [action.payload.groupId]: {
          ...state[action.payload.groupId],
          collapsed: action.payload.collapsed
        }
      }
    }

    default:
      return state
  }
}

const allIds = (state = initialState.allIds) => state

export default combineReducers({
  byId,
  allIds
})

export const getAllGroups = (state) =>
  state.allIds.map((id) => state.byId[id])
