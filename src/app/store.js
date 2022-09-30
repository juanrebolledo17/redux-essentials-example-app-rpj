import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './../features/posts/postsSlice'
import usersReducer from './../features/users/usersSlice'

// export default configureStore({
//   reducer: () => ({
//     posts: postsReducer
//   }),
// }) // does not work, I don't know why, it should work

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  }
})
