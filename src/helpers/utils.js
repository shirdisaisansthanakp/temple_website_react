import { HTML_FONT_SIZE_IN_PX, NAV_LINKS, HOME_PAGE } from './constants';

export const getPxFromRem = (remUnit = 0) => {
    let pixels;

    if (remUnit)
        pixels = remUnit * HTML_FONT_SIZE_IN_PX;
    else
        pixels = window.innerWidth;

    return `${pixels}px`;
};

export const getActivePage = () => {
    const activePage = window.location.hash;

    if(activePage)
        return NAV_LINKS.find(link => link.id === activePage).id;
    return HOME_PAGE;
};