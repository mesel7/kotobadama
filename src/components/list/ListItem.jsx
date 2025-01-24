import vocaImg from "../../assets/images/img_voca.png";
import "./ListItem.css";

const ListItem = () => {
    return (
        <div className="list-item">
            <div className="img-wrapper">
                <img alt={"VOCA"} src={vocaImg} />
            </div>
            <div className="content-wrapper">
                <div className="name">JPLT N3</div>
                <div className="word">400</div>
                <div className="description">JLPT 공부</div>
            </div>
        </div>
    );
};

export default ListItem;