import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import { UserContextProvider } from './UserContext';
import './styles/App.css';
import './styles/header.css';
import './styles/PostPage.css';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {


  return (

    <UserContextProvider >
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/profilepage/:id' element={<ProfilePage />} />
          <Route path='/adminpage' element={<AdminPage />} />
        </Route>
      </Routes>
    </UserContextProvider>



  )
}

export default App;
