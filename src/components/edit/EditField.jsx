import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditField.css";
import { icons } from "../../utils";

const EditField = ({ count, data, onChange }) => {
    return (
        <div className="edit-field">
            <div className="count">{count}</div>
            <input type={"text"} value={data.wordKanji} onChange={(e) => onChange("wordKanji", e.target.value)} />
            <input type={"text"} value={data.wordKana} onChange={(e) => onChange("wordKana", e.target.value)}/>
            <input type={"text"} value={data.meaning} onChange={(e) => onChange("meaning", e.target.value)} />
            <FontAwesomeIcon icon={icons.faEraser} style={{ color: "white", fontSize: "24px", cursor: "pointer" }} />
        </div>
    );
};

export default EditField;