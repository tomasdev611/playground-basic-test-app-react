import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state) => state.practitioner;

export const selectFetchingPractitioners = createSelector(
  selectSelf,
  (practitioner) => practitioner.fetchingPractitioners
)