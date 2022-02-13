import 'animate.css';
import 'normalize.css'
import './index.css';
import "./style.css"

import { Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/account/login" element={ <Login /> } />
        <Route path="/account/register" element={ <Register /> } />
      </Routes>
    </div>
  );
}

export default App;
