import React, { useState, createContext } from "react";
import { appContextType } from "./types";
import { pages } from "../../types/types";
import { createBrowserRouter } from "react-router-dom";
import {
    RocketLaunchIcon,
    WrenchIcon,
    HomeIcon,
} from "@heroicons/react/20/solid";
import { SideBarItemProps } from "../../components/sidebar/types";

//importing routes
import Home from "../../routes/home";
import Settings from "../../routes/settings";
import { useEffect } from "react";
import ConvolutionPlotter from "../../routes/convolutionPlotter";

//create context for app of type
export const AppContext = createContext<appContextType>({
    appName: "",
    currentPage: "Home",
    setCurrentPage: () => {},
    pages: [],
    appRouter: undefined,
    darkMode: false,
    setDarkMode: () => {},
});

//context provider

type Props = {
    children: React.ReactNode;
};

export default function AppContextProvider({ children }: Props) {
    const appName = "ConvPlot";

    const [currentPage, setCurrentPage] = useState<pages>("Home");

    const [darkMode, setDarkMode] = useState<boolean>(true);

    const pages: SideBarItemProps[] = [
        {
            label: "Home",
            link: "/",
            icon: <HomeIcon />,
        },
        {
            label: "Convolution Plotter",
            link: "/convplot",
            icon: <RocketLaunchIcon />,
        },
        {
            label: "Settings",
            link: "/settings",
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
            path: "/convplot",
            element: <ConvolutionPlotter />,
        },
        {
            path: "/settings",
            element: <Settings />,
        },
    ]);

    useEffect(() => {
        //send the user to the current page
        //get the current page from the url
        const url = window.location.href;
        const currentPage = url.split("/").pop();
        if (currentPage) {
            setCurrentPage(currentPage as pages);
        }
    }, []);

    useEffect(() => {
        //change the theme
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <AppContext.Provider
            value={{
                appName,
                currentPage,
                setCurrentPage,
                pages,
                appRouter,
                darkMode,
                setDarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
