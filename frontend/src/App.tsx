import { Route, Routes } from 'react-router-dom';
import { Header } from './components/shared/Header';
import { useAuth } from './context/AuthContext';
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Signup } from './pages/Signup';
import './styles/App.css';

function App() {
  console.log(useAuth()?.isLoggedIn);
  const auth = useAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path='/chat' element={<Chat />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
