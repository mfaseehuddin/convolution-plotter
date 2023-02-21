import { pagelinks } from '../../types/types';
export type SideBarItemProps = {
    icon: JSX.Element;
    label: pages;
    link: pagelinks;
    iconStyle?: string;
    bottom?: boolean;
    className?: string;
};
