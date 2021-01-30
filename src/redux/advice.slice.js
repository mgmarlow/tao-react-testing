import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

export const fetchAdvice = createAsyncThunk(
  'fetchAdvice',
  async ({ query }) => {
    const response = await fetch(
      `https://api.adviceslip.com/advice/search/${query}`,
    )
    return await response.json()
  },
)

const adviceAdapter = createEntityAdapter()

const adviceSlice = createSlice({
  name: 'advice',
  initialState: adviceAdapter.getInitialState({
    status: 'idle',
    found: undefined,
    error: undefined,
  }),
  extraReducers: {
    [fetchAdvice.pending]: (state, action) => {
      state.status = 'pending'
    },
    [fetchAdvice.fulfilled]: (state, { payload }) => {
      state.status = 'fulfilled'
      state.found = payload.total_results
      if (payload.slips) {
        adviceAdapter.setAll(state, payload.slips)
      } else {
        adviceAdapter.setAll(state, [])
      }
    },
    [fetchAdvice.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error
    },
  },
})

export const {
  selectIds: selectAdviceIds,
  selectById: selectAdviceById,
} = adviceAdapter.getSelectors((state) => state.advice)

export const selectAdviceIsFetching = (state) =>
  state.advice.status === 'pending'

export default adviceSlice.reducer
