import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Bruce Wayne' },
  { id: '1', name: 'Dick Grayson' },
  { id: '2', name: 'Barbara Gordon' },
  { id: '3', name: 'Jason Todd' }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
})

export default usersSlice.reducer