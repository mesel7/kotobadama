import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./NewHeader.css";
import { icons } from "../../utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewHeader = ({ name, description, onNameChange, onDescriptionChange, onCreateNewVoca }) => {
    const navigate = useNavigate();

    const handleExit = async () => {
        const result = await Swal.fire({
            title: "돌아가기",
            text: "저장하지 않고 돌아갈까요?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            showCloseButton: true,
            reverseButtons: true,
            customClass: {
                confirmButton: 'no-focus-outline',
                cancelButton: 'no-focus-outline'
            },
        });
        
        if (result.isConfirmed) {
            navigate(-1);
        }
    };

    return (
        <div className="new-header">
            <div className="header-menu">
                <FontAwesomeIcon
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handleExit}
                />
                <div className="header-title">
                    새 단어장 만들기
                </div>
            </div>
            <div className="name-wrapper">
                이름
                <input type={"text"} value={name} onChange={onNameChange} />
            </div>
            <div className="description-wrapper">
                설명
                <input type={"text"} value={description} onChange={onDescriptionChange}/>
            </div>
            <div className="button-wrapper">
                <Button text={"저장"} onClick={onCreateNewVoca}/>
                <Button text={"삭제"} />
            </div>
        </div>
    );
};

export default NewHeader;