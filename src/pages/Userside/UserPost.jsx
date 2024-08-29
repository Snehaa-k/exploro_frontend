import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PostsPage from '../../components/user-side/Posts-page/PostsPage'


const UserPost = () => {
  return (
    <div >
      <div style={{position:'fixed',width:'100%'}}>
        <Navbar/>
        </div>
        <PostsPage/>
    </div>
  )
}

export default UserPost