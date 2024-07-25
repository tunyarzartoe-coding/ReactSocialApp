import React from 'react'
import PostLists from '../../components/posts/PostLists'

const PostContainer = () => {
  return (
    <div className='container' style={{maxWidth: "500px"}}>
      <PostLists/>
    </div>
  )
}

export default PostContainer
