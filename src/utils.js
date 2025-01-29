import { faAngleLeft, faEraser } from "@fortawesome/free-solid-svg-icons";

export const icons = {
    faEraser,
    faAngleLeft
};

export const formatDate = (isoString) => {
    if (!isoString){
        return "";
    }
    const date = new Date(isoString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};