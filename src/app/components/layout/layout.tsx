import React from "react";
import Sidebar from "../sidebar/sidebar";
import { useContext } from "react";
//import the appContext to get the sidebaritems and current page
import { AppContext } from "../../context/app/appContext";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    //use the context
    const { pages, currentPage, appName } = useContext(AppContext);

    return (
        <Sidebar
            currentPage={currentPage}
            sideBarItems={pages}
            appName={appName}
            className={``}
        >
            {children}
        </Sidebar>
    );
}
