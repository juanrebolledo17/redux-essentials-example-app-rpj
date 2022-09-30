import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('')
  const users = useSelector(state => state.users)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavedPost = () => {
    if (title && content) {
      dispatch(
        postAdded(title, content, userId)
      )
      setTitle('')
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postsContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="button" onClick={onSavedPost} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}