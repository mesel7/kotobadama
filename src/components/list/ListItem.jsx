import { useNavigate } from "react-router-dom";
import vocaImg from "../../assets/images/img_voca.png";
import { formatDate, icons } from "../../utils";
import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ id, name, wordCount, createdAt, description, words }) => {
    const navigate = useNavigate();

    const handleVocaListClick = () => {
        navigate(`/voca/${id}`);
    };

    const handleVocaEditClick = () => {
        navigate(`/edit/${id}`);
    };

    const getWordStatus = () => {
        const { known, partial, unknown } = words.reduce((acc, word) => {
            if (word.status === "known") {
                acc.known += 1;
            } else if (word.status === "partial") {
                acc.partial += 1;
            } else {
                acc.unknown += 1;
            }
            return acc;
        }, { known: 0, partial: 0, unknown: 0 });

        return [known, partial, unknown];
    };

    const [known, partial, unknown] = getWordStatus();

    return (
        <div className="list-item">
            <div className="img-wrapper" onClick={handleVocaListClick}>
                <img alt={"VOCA"} src={vocaImg} />
            </div>
            <div className="content-wrapper" onClick={handleVocaListClick}>
                <div className="name">{name}</div>
                <div className="word-count">{`${wordCount} 단어`}</div>
                <div className="word-status">{`${known} · ${partial} · ${unknown}`}</div>
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div className="progress-known" style={{ width: `${(known / wordCount) * 100}%` }} />
                        <div className="progress-partial" style={{ width: `${(partial / wordCount) * 100}%` }} />
                        <div className="progress-unknown" style={{ width: `${(unknown / wordCount) * 100}%` }} />
                    </div>
                </div>
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