import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from './api'

export const GET_COUNCILLORS = createAsyncAction('councillors/GET_COUNCILLORS')
export const getCouncillorsAction = () => {
  return apiCall({
    endpoint: '/councillors?format=json',
    types: GET_COUNCILLORS
  })
}

export const SET_COUNCILLORS_FILTER = 'affairs/SET_COUNCILLORS_FILTER'
export const setCouncillorsFilterAction = (filter) => {
  return {
    filter,
    type: SET_COUNCILLORS_FILTER
  }
}