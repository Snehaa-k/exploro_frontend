import React, { useEffect, useState } from 'react'
import { ListItem,ListItemText,List,Box,Typography,Paper ,Avatar,ListItemIcon} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'; 
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import './Postspage.css'
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../../Navbar/Navbar';
import DashboardOverview from '../../Posts/Sidebar/SideBar';
import Sidebar from '../../Posts/RightSideBar/RightSide';
import MainPost from '../../Posts/MainPost/MainPost';
import CreatePost from '../../Posts/CreatePost/CreatePost';
import { fetchuser } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../../apiservice/Apiservice';
import api from '../../../axios-interceptors/AxiosInterceptors';
import TravelPostCard from '../../Posts/MainPost/PhotoPost/PhotoPost';
import TravelArticleCard from '../../Posts/MainPost/articlePost/ArticlePost';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const PostsPage = () => {
  const dispatch = useDispatch()
  const [user,setUser] = useState([])
  const [profile,setProfile] = useState([])
  const [posts, setPosts] = useState([]);
  const [article, setArticle] = useState([]);
  const [likes, setLikes] = useState();
  const [likearticle,setLikesarticle] =useState()
  const [reloadPosts, setReloadPosts] = useState(false);
  const [wallet, setWallet] = useState(null);
  console.log(profile,"imagee")
  const token = localStorage.getItem('accessToken')
  console.log(user,"hai user");
  console.log(likes,"likess");
  console.log(posts,"posts pagessss");
  console.log(wallet,"wallet_amount");
  

  
  
  
  const handleLike = async (postId) => {
    try {
      const response = await api.post(`/likeposts/${postId}/`)
      if(response){
        console.log('Post liked:',response.data.data.likes);
        setLikes(response.data.likes)
        setReloadPosts((prev) => !prev);

        
       

      }
        
    
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
   
  const handleLikearticle = async (postId) => {
    try {
      const response = await api.post(`/likearticle/${postId}/`)
      if(response){
        console.log('Post liked:',response.data.data.likes);
        setLikesarticle(response.data.likes)
       
        setReloadPosts((prev) => !prev);

        
       

      }
        
    
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  

  
  useEffect(()=>{
  
  const fetchUserData = async () => {
    try {
      const response = await dispatch(fetchuser()); 
      console.log(response.payload);
      
      if (response) {
        setUser(response.payload.user); 
        setProfile(response.payload.profile)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  fetchUserData();
}, [dispatch])



useEffect(() => {
  const fetchPosts = async () => {
   
    try {
      const response = await api.get(`/viewposts/`);
      
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching trips:', error.message);
    }
  };
  
  

fetchPosts();
}, [token,reloadPosts]);

useEffect(() => {
 
  const fetchArticle = async () => {
   
    try {
      const response = await api.get(`/viewarticle/`);
      
      setArticle(response.data.article);
    } catch (error) {
      console.error('Error fetching trips:', error.message);
    }
  };


fetchArticle();
}, [token,reloadPosts]);

useEffect(() => {
  const fetchWallet = async () => {
    try {
      const response = await api.get('/showwallet/');
      if (response) {
        setWallet(response.data.wallet);
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error.message);
    }
  };
  fetchWallet();
}, [token]);




const getLatestPost = (posts) => {
  return posts.reduce((latest, post) => {
    return new Date(post.created_at) > new Date(latest.created_at) ? post : latest;
  }, posts[0]);
};

const combinedPosts = [...posts, ...article].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const items = [
    {
      icon: <PeopleIcon color="primary" />,
      primaryText: `${user.is_travel_leader?"followers":"followeing"}`,
      secondaryText:'0',
    },
    {
      icon: <CheckCircleIcon color="success" />,
      primaryText: 'Completed Trips',
      secondaryText: '0',
    },
    {
      icon: <AccountBalanceWalletIcon color="success" />,
      primaryText: 'Wallet',
      secondaryText:  wallet ? `₹${wallet.wallet}` : 0,
    }
    
  ];
  const menuItems = [
    {
      icon: <ChatIcon color="" />,
      text: 'Chats'
    },
    {
      icon: <NotificationsIcon color="" />,
      text: 'Notifications'
    },
   
  ];
  const handleCommentChange = (event) => {
    
    console.log(event.target.value);
  };

  return (
    <div>

      
    
     <div className='dashboard'>
    
      <DashboardOverview items={items} />
      </div>
    
    

    <div className='right-side-container'>
     <Sidebar profileImage={`${API_URL}${profile.profile_image}`}
        name={user.username}
        role={user.is_travel_leader?"Travel Leader" : "Traveller"}
        menuItems={menuItems} />
    </div>
    <div className='create-post'>
   {user.is_travel_leader && (
        <div className='create-post'>
          <CreatePost setReloadPosts={setReloadPosts} />
        </div>
      )}
   </div>
   <div className='main-container'>
        {combinedPosts.map((post) => {

          if (post.post_image) {
            return (
              <TravelPostCard
                key={post.id}
                post={post}
                likes={post.likes.length || 0} 
                handleLike={handleLike}
              />
            );
          } else {
            return (
              <TravelArticleCard
                key={post.id}
                post={post}
                likes={post.likes.length || 0} 
                handleLike={handleLikearticle}
              />
            );
          }
        })}
      </div>
    
    

    </div>

   
  )
}

export default PostsPage