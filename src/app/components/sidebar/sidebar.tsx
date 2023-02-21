import React, { useRef } from "react";
import { SideBarItemProps } from "./types.d";
import { pages } from "@/types/types";

type Props = {
    sideBarItems: SideBarItemProps[];
    currentPage: pages;
    children?: React.ReactNode;
    appName: string;
    className?: string;
};

export default function Sidebar({
    sideBarItems,
    children,
    appName = "Synthia AI",
    currentPage,
    className,
}: Props) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarButtonRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        if (sidebarRef.current) {
            sidebarRef.current.classList.toggle("translate-x-0");
        }
    };

    return (
        <div className={`${className} h-screen`}>
            {currentPage !== "Auth" && (
                <>
                    {" "}
                    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start">
                                    <a href="/" className="flex ml-2 md:mr-24">
                                        <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap dark:text-white">
                                            {appName}
                                        </span>
                                    </a>
                                </div>
                                <div
                                    className="bg-emerald-400 rounded-full h-7 w-7 active:scale-90 transition-all duration-100"
                                    ref={sidebarButtonRef}
                                    onClick={toggleSidebar}
                                ></div>
                            </div>
                        </div>
                    </nav>
                    <aside
                        id="logo-sidebar"
                        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                        aria-label="Sidebar"
                        ref={sidebarRef}
                    >
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
                            <ul className="space-y-2">
                                {sideBarItems.map(
                                    (item, index) =>
                                        !item.bottom && (
                                            <SidebarItem
                                                key={index}
                                                link={item.link}
                                                icon={item.icon}
                                                label={item.label}
                                                className={`${
                                                    currentPage === item.label
                                                        ? "bg-gray-100 dark:bg-gray-700 rounded-lg"
                                                        : ""
                                                }`}
                                            />
                                        )
                                )}
                            </ul>
                            <ul className="space-y-2">
                                {sideBarItems.map(
                                    (item, index) =>
                                        item.bottom && (
                                            <SidebarItem
                                                link={item.link}
                                                key={index}
                                                icon={item.icon}
                                                label={item.label}
                                                className={`${
                                                    currentPage === item.label
                                                        ? "bg-gray-100 dark:bg-gray-700 rounded-lg"
                                                        : ""
                                                }`}
                                            />
                                        )
                                )}
                            </ul>
                        </div>
                    </aside>
                    <div className="p-4 md:ml-64 dark:bg-gray-800">
                        <div className=" p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                            {children}
                        </div>
                    </div>
                </>
            )}
            {currentPage === "Auth" && (
                <div className="w-screen h-screen flex justify-center items-center">
                    {children}
                </div>
            )}
        </div>
    );
}

import { useContext } from "react";
import { AppContext } from "../../context/app/appContext";

export function SidebarItem({
    link,
    icon,
    iconStyle,
    label,
    className,
}: SideBarItemProps) {
    const internalIconStyle = "text-gray-500 dark:text-gray-400 w-4 h-4";

    //import the appContext to get the changePage function
    const { setCurrentPage } = useContext(AppContext);
    return (
        <li className={className}>
            <a
                href={link}
                className="flex items-center p-2 px-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <span className={`first:${internalIconStyle}`}>{icon}</span>
                <span className="ml-3">{label}</span>
            </a>
        </li>
    );
}
