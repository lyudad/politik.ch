import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from './api'

export const GET_AFFAIRS = createAsyncAction('affairs/GET_AFFAIRS')
export const getAffairsAction = () => {
  return apiCall({
    endpoint: '/affairs?format=json',
    types: GET_AFFAIRS
  })
}

export const SET_AFFAIRS_FILTER = 'affairs/SET_AFFAIRS_FILTER'
export const setAffairsFilterAction = (filter) => {
  return {
    filter,
    type: SET_AFFAIRS_FILTER
  }
}