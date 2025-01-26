import Sidebar from "../components/Home/Sidebar";
import { assets } from "../assets/assets";
import { useState } from "react";
import { LoggedInComp } from "../components/Home/LoggedInComp";
import { BeforeChat } from "../components/Home/BeforeChat";
import { useSelector } from "react-redux";
import { setAuthToken } from "../api/axios.botApi";


function Home() {

    const [userLoggedIn, setUserLoggedIn] = useState(useSelector((state)=>state.userLoggedIn.value));
    console.log('Redux state : ', useSelector((state)=>state))
    setAuthToken(useSelector((state)=>state.authToken.value));

    const [input, setInput] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <>
            <div className="h-screen w-screen flex flex-row">
                <Sidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed} 
                />
                <div className="HomePage w-screen flex flex-col">
                    <div className="TopSection  flex flex-row justify-between p-6">
                        <div className="NameContainer flex items-center">
                            <h1 className="text-[2rem] text-gray-600 font-[400]">
                                Destiny
                            </h1>
                        </div>
                        {
                            userLoggedIn 
                            ? <LoggedInComp username={'Anuj Rayamajhi'} userimage={assets.user} />
                            : <LoggedInComp username={'Anonym'} userimage={assets.user} /> 
                        }
                    </div>
                    <div className="flex justify-center max-h-[37.5rem]">
                        <div className="flex flex-col w-[56.25rem]">
                            <BeforeChat
                                setInput={setInput} 
                            />
                            
                        </div>
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="absolute bottom-2 w-[56.25rem]">
                            <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-3.5 rounded-full">
                                <input
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    type="text"
                                    placeholder="Enter the Prompt Here"
                                    onKeyPress={(e) => e.key === 'Enter'}
                                    className="flex-1 bg-transparent border-0 outline-none p-2 text-lg text-gray-600"
                                />
                                <div className="flex items-center gap-4">
                                    <img
                                        src={assets.send_icon}
                                        alt=""
                                        className="w-6 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="text-sm mt-4 text-center font-light">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;