import React, { useState, createContext } from "react";
import { appContextType } from "./types";
import { pages } from "@/types/types";
import { createBrowserRouter } from "react-router-dom";
import { RocketLaunchIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { SideBarItemProps } from "../../components/sidebar/types";

//importing routes
import Home from "../../routes/home";
import Settings from "../../routes/settings";
import { useEffect } from "react";

//create context for app of type
export const AppContext = createContext<appContextType>({
    appName: "",
    currentPage: "Home",
    setCurrentPage: () => {},
    pages: [],
    appRouter: undefined,
});

//context provider

type Props = {
    children: React.ReactNode;
};

export default function AppContextProvider({ children }: Props) {

    const appName = "ConvPlot";


    const [currentPage, setCurrentPage] = useState<pages>("Home");

    const pages: SideBarItemProps[] = [
        {
            label: "Home",
            icon: <RocketLaunchIcon />,
        },
        {
            label: "Settings",
            icon: <WrenchIcon />,
            bottom: true,
        },
    ];

    //TODO: make routeObject Array

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/Home",
                    element: <Home />,
                },
            ],
        },
        {
            path: "/settings",
            element: <Settings />,
        },
    ]);

    useEffect(() => {
        //send the user to the current page
        appRouter.navigate(currentPage);
    }, [currentPage]);

    return (
        <AppContext.Provider
            value={{
                appName,
                currentPage,
                setCurrentPage,
                pages,
                appRouter,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
