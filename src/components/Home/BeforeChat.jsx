import { Greet } from "./Greet";
import { assets } from "../../assets/assets";
import { PromptCard } from "./PromptCard";

export const BeforeChat = ({
    setInput
}) => {
    const predefinedPrompts = [
        {
          text: "Suggest Some Place To Visit In Australia.",
          icon: assets.compass_icon
        },
        {
          text: "Tell me about a certain location to visit during winter.",
          icon: assets.message_icon
        },
        {
          text: "I want to explore less crowded beaches in Australia.",
          icon: assets.bulb_icon
        },
    ];

    return (
        <>
            <Greet />
            <div className="flex flex-row gap-x-4 w-fit py-10">
                {predefinedPrompts.map((prompt, index)=>{
                    return (
                        <PromptCard
                            setInput={setInput}
                            key={index}
                            prompt={prompt} 
                        />
                    );
                })}
            </div>
        </>
    );
};