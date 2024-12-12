import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import CompleteProfile from './pages/CompleteProfile';
import LogIn from './pages/LogIn';


function App() {
  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/login'>LogIN</Link>
          <Link to='/signup'>SignUp</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path = "/signup" element={<SignUp />}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path = "/CompleteProfile" element={<CompleteProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
