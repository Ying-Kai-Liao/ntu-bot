import { useSearchParams } from "next/navigation";
import Chatbox from "../course/_components/ChatBox";
import BreadCrumbComponent from "../_components/Breadcrumb";
import TopicBox from "../_components/TopicBox";

type TopicStatus = "Completed" | "In Progress" | "Not Started";

interface CourseData {
  topic: string;
  status: TopicStatus;
  lastActive?: string;
  classification?: string;
}

const CoursePage = ({ searchParams }: { searchParams: { title: string } }) => {
  const { title } = searchParams;
  // fetch data from server
  const courseData: CourseData[] = [
    {
      topic: "維持母體安全",
      status: "Completed",
      lastActive: "2024-05-20",
      classification: "懷孕早期",
    },
    {
      topic: "認識流產跡象、流產的危險高峰期",
      status: "In Progress",
      classification: "懷孕早期",
    },
    {
      topic: "兩性平權",
      status: "Completed",
      lastActive: "2024-05-22",
      classification: "懷孕早期",
    },
    {
      topic: "孕期營養、孕吐",
      status: "Not Started",
      lastActive: "2024-05-23",
      classification: "懷孕中期",
    },
    {
      topic: "維持母體安全、認識早產徵兆",
      status: "Completed",
      lastActive: "2024-05-24",
      classification: "懷孕中期",
    },
    {
      topic: "早產高危險群",
      status: "In Progress",
      lastActive: "2024-05-25",
      classification: "懷孕中期",
    },
    {
      topic: "孕期營養、養胎不養肉 (第二孕期每天熱量只需增加三百卡)",
      status: "Completed",
      lastActive: "2024-05-26",
      classification: "懷孕晚期",
    },
    {
      topic: "生產準備計畫",
      status: "Not Started",
      lastActive: "2024-05-27",
      classification: "懷孕晚期",
    },
    { topic: "認識流產跡象、流產的危險高峰期", status: "In Progress" },
    { topic: "認識流產跡象、流產的危險高峰期", status: "In Progress" },
  ];
  return (
    <div className="max-w-[1170px] w-[90%] justify-center">
      <BreadCrumbComponent route="/dashboard/course" />
      <h2 className="relative left-[20%] text-4xl text-slate-50 font-semibold mb-5">
        {title}
      </h2>
      <div className="flex flex-col items-center ">
        <div className="w-[90%] md:w-[60%] max-w-[1000px]">
          <div className="flex flex-row text-zinc-50">
            <span className="px-2">狀態</span>
            <span className="flex grow justify-start ml-6">標題</span>
            <span className="px-3">最後訪問時間</span>
          </div>
          <hr className="mt-2 mb-4 border-zinc-50" />
          <CourseList courseData={courseData} />
        </div>
      </div>
    </div>
  );
};

const CourseList: React.FC<{ courseData: CourseData[] }> = ({ courseData }) => {
  const groupedData = courseData.reduce((acc, curr) => {
    const classification = curr.classification || '未分類';
    if (!acc[classification]) {
      acc[classification] = [];
    }
    acc[classification].push(curr);
    return acc;
  }, {} as { [key: string]: CourseData[] });

  return (
    <main className="relative h-auto mb-20">
      {Object.entries(groupedData).map(([classification, topics], index) => (
        <div key={index}>
          <h2 className="text-sm font-medium mt-6 mb-2 text-zinc-50">
            {classification === "未分類" ? "" : classification}
          </h2>
          {topics.map((data, idx) => (
            <TopicBox
              key={idx}
              topic={data.topic}
              status={data.status}
              lastActive={data.lastActive ? data.lastActive : ""}
            />
          ))}
        </div>
      ))}
    </main>
  );
};

export default CoursePage;
