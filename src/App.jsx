import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// import { useEffect, useState } from 'react';
// import { setStatus } from './store/slices/serverStatusSlice';
// import { check_backend_status } from './api/axios.botApi';

function App() {
  // const [serverStatus, setServerStatus] = useState((state)=>state.serverStatus.value);
  // const dispatch = useDispatch();
  const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state)=>state.userLoggedIn.value);
    // console.log('From app.jsx : ', isAuthenticated);
    
    return isAuthenticated 
     ? <Outlet /> 
      : <Navigate to="/login" replace />;
  };

  // useEffect(()=>{
  //   if (!serverStatus) {
  //     var currentStatus = check_backend_status();
  //     if (currentStatus) {
  //       dispatch(setStatus());
  //     };
  //   }
  // },[]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path='/' element={<Navigate to={'/login'} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
