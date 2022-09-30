import React from 'react'
import { useSelector } from 'react-redux'

export default function PostAuthor({ id }) {
  const author = useSelector(state => state.users.find(user => user.id === id))
  return (
    <span>
      By {author ? author.name : 'Unknown author'}
    </span>
  )
}