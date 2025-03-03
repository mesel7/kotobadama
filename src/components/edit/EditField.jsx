import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditField.css";
import { icons } from "../../utils";

const EditField = ({ count, data, onChange }) => {
    const handleClear = () => {
        onChange("wordKanji", "");
        onChange("wordKana", "");
        onChange("meaning", "");
    };

    return (
        <div className="edit-field">
            <div className="count">{count}</div>
            <input type={"text"} value={data.wordKanji} onChange={(e) => onChange("wordKanji", e.target.value)} />
            <input type={"text"} value={data.wordKana} onChange={(e) => onChange("wordKana", e.target.value)}/>
            <input type={"text"} value={data.meaning} onChange={(e) => onChange("meaning", e.target.value)} />
            <FontAwesomeIcon
                icon={icons.faEraser}
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleClear}
            />
        </div>
    );
};

export default EditField;