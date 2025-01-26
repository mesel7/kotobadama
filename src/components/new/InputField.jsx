import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InputField.css";
import { icons } from "../../utils";

const InputField = () => {
    return (
        <div className="input-field">
            <input type={"text"} />
            <input type={"text"} />
            <input type={"text"} />
            <FontAwesomeIcon icon={icons.faEraser} style={{ color: "white", fontSize: "24px", cursor: "pointer" }} />
        </div>
    );
};

export default InputField;