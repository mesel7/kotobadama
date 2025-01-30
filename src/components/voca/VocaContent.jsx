import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./VocaContent.css";
import { icons } from "../../utils";
import { useState } from "react";

const VocaContent = ({ words, wordCount, displayOption, onStatusChange }) => {
    const [idx, setIdx] = useState(0);

    const handlePrevClick = () => {
        if (idx > 0) {
            setIdx(prev => prev - 1);
        }
    }

    const handleNextClick = () => {
        if (idx < wordCount - 1) {
            setIdx(prev => prev + 1);
        }
    }

    return (
        <div className="voca-content">
            <div className="word-wrapper">
                <div
                    className="word-kana"
                    style={{ visibility: displayOption.wordKana ? "visible" : "hidden"}}
                >
                    {words[idx].wordKana}
                </div>
                <div
                    className="word-kanji"
                    style={{ visibility: displayOption.wordKanji ? "visible" : "hidden"}}
                >
                    {words[idx].wordKanji}
                </div>
                <div
                    className="meaning"
                    style={{ visibility: displayOption.meaning ? "visible" : "hidden"}}
                >
                    {words[idx].meaning}
                </div>
            </div>
            <div className="menu-wrapper">
                <FontAwesomeIcon
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handlePrevClick}
                />
                <div className="button-wrapper">
                    <Button
                        text={"외움"}
                        type={words[idx].status === "known" ? "default" : "light"}
                        onClick={() => onStatusChange("known", idx)}
                    />
                    <Button
                        text={"반쯤"}
                        type={words[idx].status === "partial" ? "default" : "light"}
                        onClick={() => onStatusChange("partial", idx)}
                    />
                    <Button
                        text={"모름"}
                        type={words[idx].status === "unknown" ? "default" : "light"}
                        onClick={() => onStatusChange("unknown", idx)}
                    />
                </div>
                <FontAwesomeIcon
                    icon={icons.faAngleRight}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handleNextClick}
                />
            </div>
        </div>
    );
};

export default VocaContent;