import { SideBarItemProps } from "../../components/sidebar/types";
import { pages } from "../../types/types";
import { Router } from "react-router-dom";
export type appContextType = {
    appName: string;
    //pages?
    pages: SideBarItemProps[];
    currentPage: pages;
    //setCurrentPage is react use state
    setCurrentPage: React.Dispatch<React.SetStateAction<pages>>;
    appRouter: Router;
    darkMode?: boolean;
    setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
};
