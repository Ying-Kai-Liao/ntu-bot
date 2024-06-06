"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMessageContext } from './MessageContext';
import useTypingEffect from "../../_hooks/useTypingEffect";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import CursorSVG from "../../_components/icons/CursorSVG";

interface Message {
  id: string; // For pre-stored or unique messages
  role: "user" | "assistant";
  type: "text" | "image" | "quiz";
  content: string;
  imageUrl?: string;
  options?: string[];
  correctAnswer?: string;
}

interface ChatboxProps {
  chatHistory?: Message[];
  title?: string;
  content?: Message[];
}

interface FormData {
  content: string;
}

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, title, content }) => {
  const [displayResponse, setDisplayResponse] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);
  const lastestMessageRef = useRef<HTMLDivElement>(null);
  const {
    ongoingMessages,
    preStoredMessages,
    currentPreStoredMessageIndex,
    addOngoingMessage,
    addPreStoredMessagesToOngoing,
  } = useMessageContext();

  const currentPreStoredMessage = preStoredMessages[currentPreStoredMessageIndex];
  const currentMessage = ongoingMessages[ongoingMessages.length - 1];
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // // Load chat history
  // useEffect(() => {
  //   if (content) {
  //     // for (const message of content) {
  //     //   setMessages(() => [message]);
  //     //   if (message.image) break;
  //     // }
  //     setMessages(content);
  //   }
  // }, [content]);


  // Handle message submission
  const onSubmit = handleSubmit((data) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: data.content,
    };
    addOngoingMessage(newMessage);
    console.log(currentPreStoredMessageIndex);
    if (currentMessage?.type === 'quiz') {
      if (data.content === currentMessage.correctAnswer) {
        console.log('Correct!');
        alert('Correct!');
        addPreStoredMessagesToOngoing();
      } else {
        alert('Incorrect. Try again!');
        return;
      }
    } else {
      addPreStoredMessagesToOngoing();
    }

    setValue('content', '');
  });

  // Typing effect
  useTypingEffect(ongoingMessages, setDisplayResponse, setCompletedTyping);

  // Scroll to the latest message
  useEffect(() => {
    if (lastestMessageRef.current) {
      lastestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ongoingMessages]);

  return (
    <Card
      className={cn("flex flex-col max-w-sm w-full md:w-[50%] md:max-w-full")}
    >
      <CardContent className="h-[50vh] my-5">
        <ScrollArea className="h-full w-full pr-4">
          {ongoingMessages.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex w-full gap-3 text-slate-600 text-sm mb-4 ${
                  message.role === "user" && "justify-end"
                }`}
                ref={index === ongoingMessages.length - 1 ? lastestMessageRef : null}
              >
                {message.role === "assistant" &&
                ongoingMessages[index - 1]?.role != "assistant" ? (
                  <Avatar>
                    <AvatarImage src="avator.webp" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="mr-10"></div>
                )}
                <p
                  className={`leading-relaxed ${
                    message.role === "user" &&
                    "p-4 border border-zinc-200 rounded-2xl text-zinc-700"
                  }`}
                >
                  <span className="block font-bold text-zinc-700">
                    {message.role === "assistant" &&
                      ongoingMessages[index - 1]?.role != "assistant" &&
                      "孕期照護小老師"}
                  </span>
                  {index === ongoingMessages.length - 1 && message.role === "assistant"
                    ? displayResponse
                    : message.content}
                  {!completedTyping && <CursorSVG />}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="grid grid-cols-4 space-x-3" onSubmit={onSubmit}>
          <Input
            type="message"
            {...register("content")}
            placeholder="How can I help you?"
            className="col-span-3"
          />
          <Button type="submit" className="">
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chatbox;
