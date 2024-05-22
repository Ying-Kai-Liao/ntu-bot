import { useEffect } from "react";

type Message = {
  role: String;
  content: String;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const useTypingEffect = (
  messages: Message[],
  setDisplayResponse: SetState<string>,
  setCompletedTyping: SetState<boolean>
) => {
  useEffect(() => {
    if (!messages?.length) {
      return;
    }

    setCompletedTyping(false);

    const latestMessage = messages[messages.length - 1].content;
    let charIndex = 0;

    const intervalId = setInterval(() => {
      setDisplayResponse(latestMessage.slice(0, charIndex));
      charIndex++;

      if (charIndex > latestMessage.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [messages, setDisplayResponse, setCompletedTyping]);
};

export default useTypingEffect;
