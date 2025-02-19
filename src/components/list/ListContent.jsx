import ListItem from "./ListItem";
import "./ListContent.css";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import useLoadVoca from "../../hooks/useLoadVoca";
import { useRef } from "react";

const ListContent = ({ vocaList }) => {
    const navigate = useNavigate();
    const { loadVocaFromFile } = useLoadVoca();
    const fileInputRef = useRef(null);

    return (
        <div className="list-content">
            <div className="button-wrapper">
                <Button text={"추가하기"} type={"default"} onClick={() => navigate("/new")}/>
                <input
                    type="file"
                    accept="application/json"
                    style={{ display: "none" }}
                    id="voca-file"
                    ref={fileInputRef}
                    onChange={(e) => loadVocaFromFile(e, vocaList)}
                />
                <Button text={"불러오기"} type={"default"} onClick={() => fileInputRef.current?.click()} />
            </div>
            {vocaList.map((it, idx) => 
                <ListItem key={idx} {...it} />
            )}
        </div>
    );
};

export default ListContent;