"use client";

import React from "react";
import { CircleCheck, Clock2, Circle } from "lucide-react";
import Link from "next/link";

type TopicStatus = "Completed" | "In Progress" | "Not Started";

interface TopicBoxProps {
  topicId?: string; 
  topic: string;
  status?: TopicStatus;
  lastActive?: string;
}
const TopicBox: React.FC<TopicBoxProps> = ({
  topic,
  status = "Not Started",
  lastActive,
}) => {
  const getStatusIcon = (status: TopicStatus) => {
    switch (status) {
      case "Completed":
        return <CircleCheck className="text-green-500 w-6 h-6 mr-2" />;
      case "In Progress":
      // return <Clock2 className="text-orange-500 w-6 h-6 mr-2" />;
      case "Not Started":
      default:
        return <span className="w-6 mr-2"></span>;
    }
  };
  return (
    <Link href={{
        pathname: "/course",
        query: { topic },
    }} className="flex w-full max-w-[1000px] bg-zinc-50 text-zinc-500 rounded-2xl h-10 items-center mb-3 hover:scale-y-110 hover:scale-x-[103%] transition-transform">
      <div className="flex items-center px-3">{getStatusIcon(status)}</div>
      <div className="relative overflow-hidden grow justify-start ml-5 whitespace-nowrap ">
        <span>{topic}</span>
        <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-r from-transparent to-zinc-50"></div>
      </div>
      <span className="flex shirnk-0 px-5 text-zinc-400 whitespace-nowrap">{lastActive}</span>
    </Link>
  );
};

export default TopicBox;
