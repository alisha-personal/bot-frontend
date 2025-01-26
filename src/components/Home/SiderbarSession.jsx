export const SiderbarSession = ({
    SessionObj
}) => {
    const handleSessionClick = () => {
        //something
        console.log('SessionClicked')
    }
    return (
        <button className="flex w-full p-2 rounded-lg text-wrap bg-[#f0f4f9] hover:bg-[#dfe4ea] hover:scale-[1.05] duration-200 text-black hover:cursor-pointer">
            <p className="line-clamp-1">
                {SessionObj?.session_name}
            </p>
        </button>
    );
};