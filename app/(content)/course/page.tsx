"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Chatbox from "./_components/ChatBox";
import MediaBox from "./_components/MediaBox";
import BreadCrumbComponent from "../_components/Breadcrumb";
// mock up fetch messages
const fetchMessages = async (): Promise<Message[]> => {
  // Simulate fetching messages from a database
  return [
    { id: '1', role: 'assistant', type: 'text', content: 'Welcome to the Pregnancy Care Course!' },
    { id: '2', role: 'assistant', type: 'image', content: '', imageUrl: 'https://fastly.picsum.photos/id/18/200/200.jpg?hmac=naWL3P7tSw9NeN2OXqD0XhBgnBko_h5B-Z3UdUVLFcU' },
    { id: '3', role: 'assistant', type: 'quiz', content: 'What is the first trimester?', options: ['1-12 weeks', '13-24 weeks'], correctAnswer: '1-12 weeks' },
    { id: '4', role: 'assistant', type: 'text', content: 'Great job! Let’s continue.' },
    { id: '5', role: 'assistant', type: 'text', content: 'Here is some more information.' },
    // Add more messages as needed
  ];
};

interface Message {
  id: string; // For pre-stored or unique messages
  role: "user" | "assistant";
  type: "text" | "image" | "quiz";
  content: string;
  imageUrl?: string;
  options?: string[];
  correctAnswer?: string;
}

interface MessageContextProps {
  preStoredMessages: Message[];
  ongoingMessages: Message[];
  currentPreStoredMessageIndex: number;
  addOngoingMessage: (message: Message) => void;
  addPreStoredMessagesToOngoing: () => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

const CoursePage = () => {
  const topic = useSearchParams().get("topic");
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
    console.log(ongoingMessages);
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
      }}>
      <div className="max-w-[1170px] w-[90%]">
        <BreadCrumbComponent route="/dashboard/course" />
        <h2 className="text-4xl text-slate-50 font-semibold mb-5">{topic}</h2>
        <div className="flex flex-row w-full items-center">
          <Chatbox />
          <div className="flex grow justify-center ml-5">
            <MediaBox />
          </div>
        </div>
      </div>
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(
      "useMessageContext must be used within a MessageContext.Provider"
    );
  }
  return context;
};

export default CoursePage;
