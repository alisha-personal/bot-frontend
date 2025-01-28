import React, { useState } from 'react';
import { Users, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import board from '../assets/Board.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggle } from '../store/slices/userLogInSlice';
import { login, register } from '../api/axios.botApi';
import { setToken } from '../store/slices/authTokenSlice';
import { useSelector } from 'react-redux';
import { setUserName } from '../store/slices/userNameSlice';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true); //not login status, whether we are logging in or signing up
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        var authPackage = {}
        const formData = new FormData();
        try {
            if (username) {
                authPackage['username'] = username;
                formData.append('username', username);
            } else {
                throw "Empty username";
            };
            if (password) {
                authPackage['password'] = password;
                formData.append('password', password)
            } else {
                throw "Empty Password";
            };
            if (!isLogin) {
                if (email) {
                    authPackage['email'] = email;
                    register(authPackage).then((response)=>{
                      console.log('From Login.jsx : ', response);
                      setIsLogin(!isLogin);
                    })
                } else {
                    throw "Empty email";
                };
            } else {
                login(formData).then((response) => { 
                    // console.log('Response : ', response);
                    if (response){
                        console.log('Login successful');
                        dispatch(setUserName(response?.user_name));
                        dispatch(toggle());
                        dispatch(setToken(response?.access_token));
                        navigate('/home');
                    }
                }).catch((error)=> {
                    console.error('Login Failed :',error);
                });
            };

            // writeObjectToFileBrowser(authPackage, 'auth.json');
            setEmail('');
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error("Error : ", error);            
        };
        console.log('After Submit : ', useSelector((state)=> state));
    };
    
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="absolute w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden flex">
        {/* Image Section */}
        <div className="w-1/2 bg-blue-50">
          <img 
            src={board} 
            alt="Authentication visual" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className=" w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-600 text-left">
            Destiny : {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          <form 
            className="space-y-4"
            onSubmit={(e)=>handleSubmit(e)}
          >
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  onChange={(e)=>{setUsername(e.target.value)}} 
                  value={username}
                  placeholder="Username" 
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            {!isLogin && (
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="email" 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                    placeholder="Email" 
                    className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
            )}


            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type={showPassword ? "text" : "password"}
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
                placeholder="Password" 
                className="w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default AuthPage;