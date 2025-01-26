import { useState } from "react";
import InputField from "./InputField";
import "./NewContent.css";
import Button from "../common/Button";

const NewContent = () => {
    const [visibleCount, setVisibleCount] = useState(20);

    return (
        <div className="new-content">
            <div className="input-sample">
                <div>行く</div>
                <div>いく</div>
                <div>가다</div>
            </div>
            {Array.from({ length: visibleCount }).map((it, idx) => 
                <InputField key={idx} count={idx + 1} />
            )}
            {visibleCount < 200 && (
                <Button text={"20개 더 추가하기(최대 200개)"} onClick={() => setVisibleCount(prev => prev + 20)}/>
            )}
            {visibleCount >= 200 && (
                <div className="no-more-fields">최대 200개까지 추가할 수 있어요</div>
            )}
        </div>
    );
};

export default NewContent;