import { ChevronRight, ChevronLeft } from "lucide-react";
import { SiderbarSession } from "./SiderbarSession";
const staticSessions = [
    {
        session_name : "Hello this is new person in a new place and new place new things",
        session_id : "asdjfklajksd;lfj;la"
    },
    {
        session_name : "Hello this is old person",
        session_id : "asdjfklajksd;lfj;la"
    },
]

function Sidebar({
    isCollapsed, 
    setIsCollapsed,
    sessions,
    setMessages,
    setSessionId
}) {

    return (
        <div className="flex flex-row">
            <div className={`${isCollapsed 
                ? 'hidden' 
                : 'w-60'} flex flex-col justify-between text-black pl-4 pr-2 transition-all duration-300 border-r-1 border-gray-100`}>
                <div className="SideBarTop py-5 pr-5">
                    <p className="text-[1.5rem] font-[400] text-[#c4c7c5]">
                        User Sessions
                    </p>
                </div>
                <div className="flex flex-col gap-y-2">
                    {sessions.map((value, index) => {
                        return (
                            <SiderbarSession 
                                key={index}
                                SessionObj={value}
                                setMessages={setMessages}
                                setSessionId={setSessionId}
                            />
                        )
                    })}
                </div>
                <div className="SideBarBottom h-[4.75rem]">

                </div>
            </div>
            <div className="flex max-w-[2rem] h-full items-center justify-center">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-md text-gray-400 hover:text-gray-800 hover:scale-125 duration-300 focus:outline-none"
                >
                    {
                        isCollapsed 
                            ? <ChevronRight size={30}/> 
                            : <ChevronLeft size={30}/>
                    }
                </button>
            </div>
        </div>
    );
  };

export default Sidebar;