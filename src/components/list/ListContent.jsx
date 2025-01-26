import ListItem from "./ListItem";
import "./ListContent.css";
import Button from "../common/Button";

const ListContent = () => {
    return (
        <div className="list-content">
            <Button text={"+ 단어장 추가"} />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </div>
    );
};

export default ListContent;