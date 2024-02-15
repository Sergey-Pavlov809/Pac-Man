/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSelector } from '@reduxjs/toolkit'
import { selectForum } from './reducer'

export const selectTopicById = (id: number) =>
  createSelector(selectForum, state =>
    state.topics.find(({ id: innerId }) => id === innerId)
  )

export const selectCommentsByTopicId = (id: number) =>
  createSelector(selectForum, state =>
    state.comments.filter(({ theme_id }) => id === theme_id)
  )
