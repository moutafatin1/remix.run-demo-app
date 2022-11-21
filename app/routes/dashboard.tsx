import { Outlet } from "@remix-run/react";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Sidebar } from "~/components/Sidebar";

const DashboardParentRoute = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
      <div className="flex flex-col md:pl-72">
        <div className="sticky top-0 z-10 flex h-16 items-center bg-purple-100 md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="ml-2 rounded-md p-1 text-2xl text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <AiOutlineMenu />
          </button>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardParentRoute;
