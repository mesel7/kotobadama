import { useNavigate } from "react-router-dom";
import vocaImg from "../../assets/images/img_voca.png";
import { formatDate } from "../../utils";
import "./ListItem.css";

const ListItem = ({ id, name, wordCount, createdAt, description }) => {
    const navigate = useNavigate();

    const handleVocaListClick = () => {
        navigate(`/voca/${id}`);
    };

    return (
        <div className="list-item" onClick={handleVocaListClick}>
            <div className="img-wrapper">
                <img alt={"VOCA"} src={vocaImg} />
            </div>
            <div className="content-wrapper">
                <div className="name">{name}</div>
                <div className="word">{`${wordCount} 단어`}</div>
                <div className="created-at">{formatDate(createdAt)}</div>
                <div className="description">{description}</div>
            </div>
        </div>
    );
};

export default ListItem;