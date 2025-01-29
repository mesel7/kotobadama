import ListItem from "./ListItem";
import "./ListContent.css";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const ListContent = ({ vocaList }) => {
    const navigate = useNavigate();

    return (
        <div className="list-content">
            <Button text={"+ 단어장 추가"} onClick={() => navigate("/new")}/>
            {vocaList.map((it, idx) => 
                <ListItem key={idx} {...it} />
            )}
        </div>
    );
};

export default ListContent;