export const Greet = () => {

    return (
        <div className="w-fit">
            <p  
                className="mt-12 bg-clip-text text-transparent text-[3.5rem] font-[400] text-[#c4c7c5]"
                style={{
                    background: 'linear-gradient(16deg, #4b90ff, #ff5546)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    }}
            >
                Hello , Traveller
            </p>
            <p className="text-[3.5rem] font-[400] text-[#c4c7c5] -mt-3">
                How Can i Help You Today?
            </p>
        </div>
    );

};