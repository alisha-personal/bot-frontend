export const LoggedInComp = ({
    username,
    userimage
}) => {
    return (
        <div className="LoginContainer flex flex-row justify-between gap-x-4 items-center px-2">
            <span className="text-gray-600">
                {username}
            </span>
            <span>
                <img 
                    src={userimage} 
                    alt="User Pic"
                    className="rounded-full"
                    width={50}
                />
            </span>
        </div>
    );
};