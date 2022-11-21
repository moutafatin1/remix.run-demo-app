import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "@remix-run/react";
import type { ReactNode } from "react";
import React, { Fragment } from "react";
import { fn } from "~/utils";
import { TransitionOpacity } from "../common/Transitions/Transitions";
import { sidebarNavigation } from "./navigationData";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};
export function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 flex md:hidden"
          onClose={closeSidebar}
        >
          <TransitionOpacity>
            <div className="fixed inset-0  bg-gray-600 bg-opacity-70"></div>
          </TransitionOpacity>
          <TransitionOpacity>
            <Dialog.Panel
              as="aside"
              className="relative flex w-full max-w-xs flex-1 flex-col  bg-gray-800 pt-5"
            >
              <Sidebar.Header />
              <Sidebar.Nav />
              <Sidebar.Footer />
            </Dialog.Panel>
          </TransitionOpacity>
        </Dialog>
      </Transition>

      {/* Static sidebar */}
      <div className="inset-y-0 hidden  flex-1  flex-col bg-gray-800 pt-5 md:fixed  md:flex md:w-72">
        <Sidebar.Header />
        <Sidebar.Nav />
        <Sidebar.Footer />
      </div>
    </>
  );
}

Sidebar.Header = function Header() {
  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-white">Expense App</h1>
    </div>
  );
};

Sidebar.Nav = function Nav() {
  return (
    <div className="mt-5 h-0 flex-1 overflow-y-auto">
      <nav className="mt-5 space-y-2 px-2">
        {sidebarNavigation.map((item) => (
          <Sidebar.NavItem key={item.name} icon={item.icon} href={item.href}>
            {item.name}
          </Sidebar.NavItem>
        ))}
      </nav>
    </div>
  );
};

type NavItemProps = {
  children: React.ReactNode;
  icon?: ReactNode;
  href: string;
};

Sidebar.NavItem = function NavItem({ children, href, icon }: NavItemProps) {
  return (
    <NavLink
      end
      to={href}
      className={({ isActive }) =>
        fn(
          "flex items-center rounded-md p-2 font-medium text-gray-300",
          isActive && "bg-gray-900 text-white",
          !isActive &&
            "transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
        )
      }
    >
      <span className="mr-4 text-2xl">{icon}</span>
      {children}
    </NavLink>
  );
};

Sidebar.Footer = function footer() {
  return (
    <div className="flex items-center gap-2 bg-gray-700 p-4">
      <img
        className="h-14 w-14 rounded-full"
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="avatar"
      />
      <div className="flex flex-col">
        <span className="font-medium text-white">Oussama Moutafatin</span>
        <span className="text-gray-300">View Profile</span>
      </div>
    </div>
  );
};
