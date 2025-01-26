export const PromptCard = ({
    prompt,
    setInput
}) => {
    return (
        <div 
            onClick={()=>setInput(prompt.text)}    
            className="relative h-[200px] p-4 bg-[#f0f4f9] rounded-lg cursor-pointer w-55 text-wrap hover:scale-[1.05] hover:bg-[#dfe4ea] duration-200"
        >
            <p className="text-lg text-gray-600">
                {prompt.text}
            </p>
            <img 
                src={prompt.icon} 
                alt="" 
                className="p-5 rounded-full bg-white absolute -bottom-[20px] -right-[20px] scale-[0.4]"
            />
        </div>
    );
};