"use client";

import Chat from "@/components/home/chat";
import Header from "@/components/home/header";
import Sidebar from "@/components/home/sidebar/sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <div className="">
      {/* Desktop Mode */}
      <div className="hidden lg:flex flex-col">
        <Header />
        <div className="grid grid-cols-[1fr_5fr]">
          <Sidebar />
          <Chat />
        </div>
      </div>

      {/* Small & Medium Screen */}
      <div className="lg:hidden flex flex-col">
        <Header />
        <div className="">
          {/* <Sidebar/> */}
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
