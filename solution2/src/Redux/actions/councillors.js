import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from './api'

export const GET_COUNCILLORS = createAsyncAction('councillors/GET_COUNCILLORS')
export const getCouncillorsAction = () => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
  return apiCall({
    endpoint: '/councillors/?format=json',
    types: GET_COUNCILLORS
  })
}
