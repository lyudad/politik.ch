import { createSelector } from 'reselect'

const routerData = state => state.councillors

export const getCouncillors = createSelector(routerData, data => data.councillors)

