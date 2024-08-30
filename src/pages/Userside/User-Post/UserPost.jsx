import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import PostsPage from '../../../components/user-side/Posts-page/PostsPage'
import './UserPost.css'

const UserPost = () => {
  const menuItemsLead = [
    { label: 'Home', onClick: () => console.log('Home clicked') },
    { label: 'Create', onClick: () => console.log('create clicked') },
    { label: 'Destination', onClick: () => console.log('Destination clicked') },
  ];
  return (

    <div >
      <div style={{position:'fixed',width:'100%',zIndex: 3}}>
        <Navbar menuItems={menuItemsLead} />
        </div>
        <PostsPage/>
    </div>
  )
}

export default UserPost