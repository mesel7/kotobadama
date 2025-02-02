import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import EditHeader from "../components/edit/EditHeader";
import EditContent from "../components/edit/EditContent";
import { VocaDispatchContext, VocaStateContext } from "../contexts/VocaContext";

const Edit = () => {
    const state = useContext(VocaStateContext);
    const { onUpdate, onDelete } = useContext(VocaDispatchContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // context에서 가져온 모든 단어장 객체 배열에서 id에 맞는 단어장 객체 하나를 관리
    const [voca, setVoca] = useState({});

    // useEffect에서 기존 데이터로 초기화하고 props로 전달하여 사용자 입력을 통해 업데이트
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [localWords, setLocalWords] = useState([]);

    useEffect(() => {
        if (state.length === 0) {
            return;
        }
    
        const vocaData = state.find((it) => String(it.id) === String(id));
        if (vocaData) {
            setVoca(vocaData);
            setName(vocaData.name);
            setDescription(vocaData.description);
            setLocalWords(vocaData.words.map(it => ({ ...it }))); 
            setIsDataLoaded(true);
        } else {
            Swal.fire({
                title: "오류",
                text: "존재하지 않는 단어장입니다",
                icon: "error",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
                willClose: () => {
                    navigate(-1, { replace: true });
                }
            });
        }
    }, [id]);

    const handleUpdateVoca = async () => {
        const result = await Swal.fire({
            title: "저장",
            text: "변경사항을 저장할까요?",
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
            const validWords = localWords.filter(
                (it) => it && (it.wordKanji?.trim() || it.wordKana?.trim() || it.meaning?.trim())
            );
                    
            if (validWords.length <= 0) {
                Swal.fire({
                    title: "단어 입력",
                    text: "단어를 1개 이상 입력해주세요",
                    icon: "warning",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline'
                    }
                });
                return;
            }

            onUpdate({
                ...voca,
                name,
                wordCount: validWords.length,
                description,
                currentIdx: 0,
                words: validWords
            });
            Swal.fire({
                title: "단어장 수정",
                text: "단어장이 수정되었습니다",
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                }
            });

            navigate("/list");
        }
    };

    const handleDeleteVoca = async () => {
        const result = await Swal.fire({
            title: "삭제",
            text: "정말 삭제할까요? 복구되지 않습니다",
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
            onDelete({ ...voca });
            Swal.fire({
                title: "단어장 삭제",
                text: "단어장이 삭제되었습니다",
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                }
            });

            navigate("/list");
        }
    };
    
    if (!isDataLoaded) {
        return <div>데이터를 불러오는 중이에요</div>;
    } else {
        return (
            <div className="edit">
                <EditHeader
                    name={name}
                    description={description}
                    onNameChange={(e) => setName(e.target.value)}
                    onDescriptionChange={(e) => setDescription(e.target.value)}
                    onUpdateVoca={handleUpdateVoca}
                    onDeleteVoca={handleDeleteVoca}
                />
                <EditContent localWords={localWords} setLocalWords={setLocalWords} />
            </div>
        );
    }
};

export default Edit;