"use client";
import React from "react";
import { Hospital } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const NavBar = () => {
  const user = useCurrentUser();
  return (
    <nav className="sticky flex flex-row z-10 top-10 w-[90%] max-w-[1170px] rounded-3xl justify-between items-center backdrop-filter backdrop-blur-lg border-b border-zinc-200 bg-zinc-50/20 p-4">
      <Link href={"/dashboard"} className="flex items-center space-x-4">
        <Hospital className="text-white w-8 h-8" />
        <span className="text-white text-lg font-bold">NTU 孕期護理</span>
      </Link>
      <div className="flex items-center space-x-4">
        {/* <Link href={"/dashboard"} className="text-white">課程清單</Link>
            <Link href={"/chat"} className="text-white">聊天室</Link>
            <Link href={"/profile"} className="text-white">個人資料</Link> */}
        <span className="text-zinc-500 ">{user?.name}</span>
        <LogoutButton>
          <Button className="bg-transparent text-zinc-500 hover:bg-zinc-600 hover:text-zinc-50 rounded-2xl">登出</Button>
        </LogoutButton>
      </div>
    </nav>
  );
};

export default NavBar;
