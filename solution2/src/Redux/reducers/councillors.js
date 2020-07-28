import { createReducer } from 'Helpers/redux'
import { GET_COUNCILLORS, SET_COUNCILLORS_FILTER } from 'Redux/actions/councillors'

const initialState = {
  councillors: null,
  error: null,
  filterField: null
}

const handlers = {
  [GET_COUNCILLORS.SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      councillors: state.filterField ? action.payload.data.filter(el => el[state.filterField] === state.filterField) : action.payload.data,
    })
  },
  [GET_COUNCILLORS.FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload.data,
    })
  },
  [SET_COUNCILLORS_FILTER.SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
        filterField: action.payload.filterField,
    })
  },
}

export default createReducer(initialState, handlers)
