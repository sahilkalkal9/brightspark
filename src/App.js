import logo from './logo.svg';
import './App.scss';
import Home from './components/home/home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Profile from './components/profile/profile';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
