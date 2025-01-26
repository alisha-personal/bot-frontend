import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/Login';
import { useSelector } from 'react-redux';

function App() {

  const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state)=>state.userLoggedIn.value);
    // console.log('From app.jsx : ', isAuthenticated);
  
    return isAuthenticated 
     ? <Outlet /> 
      : <Navigate to="/login" replace />;
  };

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
    </>
  );
};

export default App;
