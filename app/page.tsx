import Chat from "@/components/home/chat";
import Header from "@/components/home/header";
import Sidebar from "@/components/home/sidebar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="grid grid-cols-[1fr_5fr]">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  );
}
