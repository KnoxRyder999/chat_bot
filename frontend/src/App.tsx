import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './assets/components/Header';
import { Chat } from './assets/pages/Chat';
import { Home } from './assets/pages/Home';
import { Login } from './assets/pages/Login';
import { NotFound } from './assets/pages/NotFound';
import { Signup } from './assets/pages/Signup';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
