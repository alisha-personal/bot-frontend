import Sidebar from "../components/Home/Sidebar";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import { LoggedInComp } from "../components/Home/LoggedInComp";
import { BeforeChat } from "../components/Home/BeforeChat";
import { useSelector } from "react-redux";
import { setAuthToken } from "../api/axios.botApi";
import { get_user_sessions } from "../api/axios.botApi";
import { Loader } from "../components/Home/Chat/Loader";
import { initial_get_response, session_get_response  } from "../api/axios.botApi";
import ConversationContainer from "../components/Home/Chat/ConversationContainer";

function Home() {

    const [userLoggedIn, setUserLoggedIn] = useState(useSelector((state)=>state.userLoggedIn.value));
    console.log('Redux state : ', useSelector((state)=>state))
    const [userName, setUserName] = useState(useSelector((state)=>state.userName.value) || 'Anonym')
    setAuthToken(useSelector((state)=>state.authToken.value));

    const [input, setInput] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [sessions, setSessions] = useState([]);

    const [messages, setMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null); 
    
    useEffect(()=>{
        if (!sessions) {
            let sess;
            async () => {
                sess = await get_user_sessions();
                setSessions(sess)
            };
        }
    },[])

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        
        // Add user message
        const userMessage = { content: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        
        // Clear input and show loading
        setInput('');
        if (!showChat) setShowChat(true);
        setIsLoading(true);
    
        try {
          let botResponse;
          
          if (!sessionId) {
            // Initial message - get both response and session ID
            const [response, newSessionId] = await initial_get_response(input);
            botResponse = response;
            setSessionId(newSessionId);
          } else {
            // Continuing conversation - use existing session
            botResponse = await session_get_response(input, sessionId);
          }
          
          // Add bot message
          const botMessage = { content: botResponse, isBot: true };
          setMessages(prev => [...prev, botMessage]);
    
        } catch (error) {
          console.error('Error getting response:', error);
          // Optionally add error message to chat
          setMessages(prev => [...prev, { 
            content: "Sorry, I encountered an error. Please try again.", 
            isBot: true 
          }]);
        } finally {
          setIsLoading(false);
        }
      };

    return (
        <>
            <div className="h-screen w-screen flex flex-row">
                <Sidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed} 
                    sessions={sessions}
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
                            ? <LoggedInComp username={userName} userimage={assets.user} />
                            : <LoggedInComp username={'Anonym'} userimage={assets.user} /> 
                        }
                    </div>
                    <div className="flex justify-center max-h-[37.5rem]">
                        <div className="flex flex-col w-[56.25rem]">
                            {showChat ? (
                                <ConversationContainer 
                                    messages={messages}
                                    isLoading={isLoading} 
                                />
                            ) : (
                                <BeforeChat setInput={setInput} />
                            )}
                        </div>
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="absolute bottom-2 h-[5rem] w-[56.25rem]">
                            <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-3.5 rounded-full">
                                <input
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    type="text"
                                    placeholder="Enter the Prompt Here"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage();
                                        }
                                    }}
                                    className="flex-1 bg-transparent border-0 outline-none p-2 text-lg text-gray-600"
                                />
                                <div className="flex items-center gap-4">
                                    <img
                                        src={assets.send_icon}
                                        alt=""
                                        className="w-6 cursor-pointer"
                                        onClick={()=>handleSendMessage()}
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