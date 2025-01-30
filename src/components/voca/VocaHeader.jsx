import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./VocaHeader.css";
import { icons } from "../../utils";

const VocaHeader = ({ vocaName, displayOption, onClickDisplayOption, onSaveAndExit }) => {
    return (
        <div className="voca-header">
            <div className="header-menu">
                <FontAwesomeIcon
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={onSaveAndExit}
                />
                <div className="header-title">{vocaName}</div>
                <div className="current-word">125/200</div>
            </div>
            <div className="display-option">
                <Button
                    text={"한자"}
                    type={displayOption.wordKanji ? "default" : "light"}
                    onClick={() => onClickDisplayOption("wordKanji")}
                />
                <Button
                    text={"가나"}
                    type={displayOption.wordKana ? "default" : "light"}
                    onClick={() => onClickDisplayOption("wordKana")}
                />
                <Button
                    text={"뜻"}
                    type={displayOption.meaning ? "default" : "light"}
                    onClick={() => onClickDisplayOption("meaning")}
                />
            </div>
        </div>
    );
};

export default VocaHeader;