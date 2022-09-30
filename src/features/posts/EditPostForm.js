import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'

export default function EditPostForm({ match }) {
  const { postId } = match.params
  const post = useSelector(state => selectPostById(state, postId))
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavedPost = () => {
    if (title && content) {
      dispatch(postUpdated({id: postId, title, content}))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post:</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
          type="text" 
          name="postTitle" 
          id="postTitle" 
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea 
          name="postContent" 
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavedPost}>
          Save Post
        </button>
      </form>
    </section>
  )
}