import 'animate.css';
import 'normalize.css'
import './index.css';
import "./style.css"
import axios from "./axios"
import { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Admin from './components/admin/Admin';
import AdminDashboard from './components/admin/AdminDashboard';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from "./features/services/user.service"

const getCSRFToken = async () => {
  const response = await axios.get('/getCSRFToken');
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
  return
};



const ProtectedRoute = ({
  user,
  statusCode,
  redirectPath = '/account/login',
  children,
}) => {
  if (!user.username && statusCode === 403) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch()
  const { user, errMessage, status } = useSelector((state) => state.user)
  useEffect(() => {
    getCSRFToken()
    dispatch(getUser())

  }, [user.username, errMessage])

  return (
    <div className="App">
      <Routes>
        <Route path="/account/login" element={ <Login /> } />
        <Route path="/account/register" element={ <Register /> } />
        <Route path="/admin/" element={ <ProtectedRoute user={user} statusCode={status}><Admin /></ProtectedRoute> }>
          <Route path="" element={ <AdminDashboard /> } />
          <Route path="dashboard" element={ <AdminDashboard /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
