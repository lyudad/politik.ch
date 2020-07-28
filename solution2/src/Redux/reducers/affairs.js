import { createReducer } from 'Helpers/redux'
import { GET_AFFAIRS, SET_AFFAIRS_FILTER } from 'Redux/actions/affairs'

const initialState = {
  affairs: null,
  error: null,
  filterField: null
}

const handlers = {
  [GET_AFFAIRS.SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
        affairs: state.filterField ? action.payload.data.filter(el => el[state.filterField] === state.filterField) : action.payload.data,
    })
  },
  [GET_AFFAIRS.FAILURE]: (state, action) => {
    console.log('action>>>>>>', action.payload.data)
    return Object.assign({}, state, {
      error: action.payload.data,
    })
  },
  [SET_AFFAIRS_FILTER.SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
        filterField: action.payload.filterField,
    })
  },
}

export default createReducer(initialState, handlers)
