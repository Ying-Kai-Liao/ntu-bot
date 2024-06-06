"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { MessageProvider } from "./_components/MessageContext";
import Chatbox from "./_components/ChatBox";
import MediaBox from "./_components/MediaBox";
import BreadCrumbComponent from "../_components/Breadcrumb";

const CoursePage: React.FC = () => {
  const topic = useSearchParams().get("topic");

  return (
    <MessageProvider>
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
    </MessageProvider>
  );
};

export default CoursePage;
