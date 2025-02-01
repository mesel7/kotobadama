import { useNavigate } from "react-router-dom";
import vocaImg from "../../assets/images/img_voca.png";
import { formatDate, icons } from "../../utils";
import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ id, name, wordCount, createdAt, description }) => {
    const navigate = useNavigate();

    const handleVocaListClick = () => {
        navigate(`/voca/${id}`);
    };

    const handleVocaEditClick = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="list-item">
            <div className="img-wrapper" onClick={handleVocaListClick}>
                <img alt={"VOCA"} src={vocaImg} />
            </div>
            <div className="content-wrapper" onClick={handleVocaListClick}>
                <div className="name">{name}</div>
                <div className="word">{`${wordCount} 단어`}</div>
                <div className="created-at">{formatDate(createdAt)}</div>
                <div className="description">{description}</div>
            </div>
            <div className="menu-wrapper">
                <FontAwesomeIcon
                    icon={icons.faPenToSquare}
                    style={{ cursor: "pointer", color: "#b3e0fc" }}
                    onClick={handleVocaEditClick}
                />
            </div>
        </div>
    );
};

export default ListItem;