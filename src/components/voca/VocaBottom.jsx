import Button from "../common/Button";
import "./VocaBottom.css";

const VocaBottom = ({ displayOption, onClickDisplayOption }) => {
    return (
        <div className="voca-bottom">
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
        </div>
    );
};

export default VocaBottom;