import { createSelector } from 'reselect'

const affairsData = state => state.affairs

export const getAffairs = createSelector(affairsData, data => data.affairs)

