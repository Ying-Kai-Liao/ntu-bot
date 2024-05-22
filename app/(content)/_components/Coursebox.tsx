"use client";
import React from "react";
import { FaCheckCircle, FaSpinner, FaCircle } from "react-icons/fa";
import { CircleCheck, Clock2, Circle } from "lucide-react";
import Link from "next/link";

type CourseStatus = "Completed" | "In Progress" | "Not Started";

interface CourseBoxProps {
  courseId?: string;
  title: string;
  tag?: string;
  status?: CourseStatus;
  description?: string;
}

const tagColorMapping: { [key: string]: string } = {
  新手須知: "bg-sky-600 text-white",
  好爸媽必備: "bg-green-600 text-white",
  為了寶寶: "bg-pink-500 text-white",
  非常重要: "bg-yellow-500 text-white",
  爸媽心法: "bg-purple-500 text-white",
  育兒指南: "bg-teal-500 text-white",
};

const CourseBox: React.FC<CourseBoxProps> = ({
  title,
  status = "Not Started",
  tag = "課程",
  description,
}) => {
  const getStatusIcon = (status: CourseStatus) => {
    switch (status) {
      case "Completed":
        return <CircleCheck className="text-green-500 w-6 h-6 mr-2" />;
      case "In Progress":
        return <Clock2 className="text-orange-500 w-6 h-6 mr-2" />;
      case "Not Started":
      default:
        return <></>;
    }
  };

//   const tagClasses = tagColorMapping[tag] || "bg-gray-500 text-white";
const tagClasses = "bg-zinc-400 text-zinc-50";

  return (
    <Link href={{
        pathname: "/topic",
        query: { title },
    }} className="flex flex-col flex-grow items-start bg-slate-50 border border-gray-300 rounded-xl p-6 shadow-lg w-[240px] h-56 mr-5 mb-5 hover:scale-110 transition-transform overflow-hidden">
      <h2 className="text-xl mb-2 font-medium text-slate-700">{title}</h2>
      <div className="flex flex-row space-x-3 mb-6">
        <span className={`px-2 py-1 rounded-full text-xs ${tagClasses}`}>
          {tag}
        </span>
        <div className="flex items-center">{getStatusIcon(status)}</div>
      </div>
      <div className="relative mt-2 w-full text-muted-foreground h-[112px]">
        <p className="text-xs text-zinc-500 tracking-wider text-ellipsis overflow-hidden">{description}</p>
        <div className="absolute bottom-2 left-0 w-full h-12 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-5 bg-zinc-50"></div>
      </div>
    </Link>
  );
};

export default CourseBox;
