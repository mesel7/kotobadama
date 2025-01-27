import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./NewHeader.css";
import { icons } from "../../utils";
import { useNavigate } from "react-router-dom";

const NewHeader = ({ onCreateNewVoca }) => {
    const navigate = useNavigate();

    return (
        <div className="new-header">
            <div className="header-menu">
                <FontAwesomeIcon
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                />
                <div className="header-title">
                    새 단어장 만들기
                </div>
            </div>
            <div className="name-wrapper">
                이름
                <input type={"text"} />
            </div>
            <div className="description-wrapper">
                설명
                <input type={"text"} />
            </div>
            <div className="button-wrapper">
                <Button text={"저장"} />
                <Button text={"삭제"} />
            </div>
        </div>
    );
};

export default NewHeader;