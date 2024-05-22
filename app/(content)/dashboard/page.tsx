"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import CourseBox from "../_components/Coursebox";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const user = useCurrentUser();

  // fetch educational courses from the server

  return (
    <section className="flex grow flex-col p-5 ml-5 items-center justify-center h-full">
      <h2
        className={cn("text-4xl font-semibold text-white drop-shadow-md mb-8 mr-5")}
      >
        課程清單
      </h2>
      <div className="flex flex-wrap max-w-[1000px] w-[90%]">
        <CourseBox title="產前衛教篇" status="Completed" tag="新手須知" description="產前衛教篇旨在為即將成為父母的您提供全面的產前教育與指導。本篇將涵蓋孕期營養、產前運動、產前檢查、胎教、以及分娩過程等重要內容，幫助您更好地了解和準備孕期的每一個階段，確保母嬰健康，順利迎接新生命的到來。透過這些知識，您將能夠更自信地應對孕期中的各種挑戰，為寶寶創造最好的成長環境。"/>
        <CourseBox title="待產須知篇" status="In Progress" tag="好爸媽必備"/>
        <CourseBox title="產後護理篇" status="Not Started" tag="為了寶寶"/>
        <CourseBox title="產前衛教篇" status="Completed" tag="非常重要"/>
        <CourseBox title="待產須知篇" status="In Progress" tag="爸媽心法"/>
        <CourseBox title="產後護理篇" status="Not Started" />
      </div>
    </section>
  );
};

export default Dashboard;
