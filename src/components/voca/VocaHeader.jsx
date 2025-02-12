import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./VocaHeader.css";
import { icons } from "../../utils";

const VocaHeader = ({ vocaName, currentIdx, wordCount, displayOption, onClickDisplayOption, filterOption, onClickFilterOption, onSaveAndExit }) => {
    return (
        <div className="voca-header">
            <div className="header-menu">
                <FontAwesomeIcon
                    className="prev-button"
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer", fontSize: "24px" }}
                    onClick={onSaveAndExit}
                />
                <div className="header-title">{vocaName}</div>
                <div className="current-word">{`${currentIdx + 1} / ${wordCount}`}</div>
            </div>
            <div className="display-option">
                <div className="toggle-button">
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
                <div className="filter-button">
                    <Button
                        text={"모르는 단어만"}
                        type={filterOption ? "default" : "light"}
                        onClick={() => onClickFilterOption(true)}
                    />
                    <Button
                        text={"모든 단어"}
                        type={!filterOption ? "default" : "light"}
                        onClick={() => onClickFilterOption(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default VocaHeader;