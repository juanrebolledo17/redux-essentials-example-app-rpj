import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { response } from 'msw'
import { client } from '../../api/client'

// const initialState = [
//   { 
//     id: '1', 
//     title: 'First Post!', 
//     content: 'Hello!', 
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0} 
//   },
//   { 
//     id: '2', 
//     title: 'Second Post', 
//     content: 'More text', 
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
//   },
//   { 
//     id: '3', 
//     title: 'Third Post', 
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, consectetur!', 
//     date: sub(new Date(), { minutes: 35 }).toISOString(),
//     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
//   }
// ]

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const post = state.posts.find(post => post.id === id)
      if (post) {
        post.title = title
        post.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const post = state.posts.find(post => post.id === postId)
      if (post) {
        post.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
