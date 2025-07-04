import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './features/book/bookSlice'
import { bookApi } from './api/bookApi'
import { borrowApi } from './api/borrowApi'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      borrowApi.middleware,
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch