import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditHeader.css";
import { icons } from "../../utils";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditHeader = ({ name, description, onNameChange, onDescriptionChange, onUpdateVoca, onDeleteVoca }) => {
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
        <div className="edit-header">
            <div className="header-menu">
                <FontAwesomeIcon
                    className="prev-button"
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer", fontSize: "24px" }}
                    onClick={handleExit}
                />
                <div className="header-title">
                    단어장 수정
                </div>
            </div>
            <div className="name-wrapper">
                이름
                <input type={"text"} value={name} onChange={onNameChange} />
            </div>
            <div className="description-wrapper">
                설명
                <input type={"text"} value={description} onChange={onDescriptionChange} />
            </div>
            <div className="button-wrapper">
                <Button text={"저장"} type={"default"} onClick={onUpdateVoca} />
                <Button text={"삭제"} type={"light"} onClick={onDeleteVoca} />
            </div>
        </div>
    );
};

export default EditHeader;