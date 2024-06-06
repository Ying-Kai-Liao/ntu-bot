import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the Message interface
interface Message {
  id: string; // For pre-stored or unique messages
  role: "user" | "assistant";
  type: "text" | "image" | "quiz";
  content: string;
  imageUrl?: string;
  options?: string[];
  correctAnswer?: string;
}

// Define the context props interface
interface MessageContextProps {
  preStoredMessages: Message[];
  ongoingMessages: Message[];
  currentPreStoredMessageIndex: number;
  addOngoingMessage: (message: Message) => void;
  addPreStoredMessagesToOngoing: () => void;
}

// Create the context
const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

// Mock fetchMessages function
const fetchMessages = async (): Promise<Message[]> => {
  return [
    { id: '1', role: 'assistant', type: 'text', content: 'Welcome to the Pregnancy Care Course!' },
    { id: '2', role: 'assistant', type: 'image', content: '', imageUrl: 'https://fastly.picsum.photos/id/18/200/200.jpg?hmac=naWL3P7tSw9NeN2OXqD0XhBgnBko_h5B-Z3UdUVLFcU' },
    { id: '3', role: 'assistant', type: 'quiz', content: 'What is the first trimester?', options: ['1-12 weeks', '13-24 weeks'], correctAnswer: '1-12 weeks' },
    { id: '4', role: 'assistant', type: 'text', content: 'Great job! Let’s continue.' },
    { id: '5', role: 'assistant', type: 'text', content: 'Here is some more information.' },
    // Add more messages as needed
  ];
};

// Create the provider component
export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preStoredMessages, setPreStoredMessages] = useState<Message[]>([]);
  const [ongoingMessages, setOngoingMessages] = useState<Message[]>([]);
  const [currentPreStoredMessageIndex, setCurrentPreStoredMessageIndex] =
    useState(0);

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessages();
      setPreStoredMessages(fetchedMessages);
      setOngoingMessages(fetchedMessages.slice(0, 1)); // Initialize ongoing messages with the first message
      setCurrentPreStoredMessageIndex(1); // Set index to the next message to be added
    };

    loadMessages();
  }, []);

  const addOngoingMessage = (message: Message) => {
    setOngoingMessages((prevMessages) => [...prevMessages, message]);
  };

  const addPreStoredMessagesToOngoing = () => {
    const messagesToAdd: Message[] = [];
    let index = currentPreStoredMessageIndex;
    while (index < preStoredMessages.length && preStoredMessages[index].type !== 'quiz') {
      messagesToAdd.push(preStoredMessages[index]);
      index++;
    }
    if (index < preStoredMessages.length) {
      messagesToAdd.push(preStoredMessages[index]);
      index++;
    }
    setOngoingMessages((prevMessages) => [...prevMessages, ...messagesToAdd]);
    setCurrentPreStoredMessageIndex(index);
  };

  return (
    <MessageContext.Provider
      value={{
        preStoredMessages,
        ongoingMessages,
        currentPreStoredMessageIndex,
        addOngoingMessage,
        addPreStoredMessagesToOngoing,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the context
export const useMessageContext = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(
      "useMessageContext must be used within a MessageProvider"
    );
  }
  return context;
};
