import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    
  )
}

export default function PostsList() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor id={post.user} /> {post.date && <TimeAgo timestamp={post.date} />}
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} classame="button muted-button">
          View Post
        </Link>
      </article>
    )
  })

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}