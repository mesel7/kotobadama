import { useContext, useState } from "react";
import NewContent from "../components/new/NewContent";
import NewHeader from "../components/new/NewHeader";
import { VocaDispatchContext } from "../contexts/VocaContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const New = () => {
    const { onCreate } = useContext(VocaDispatchContext);

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [words, setWords] = useState([]);

    const handleCreateNewVoca = () => {
        if(!name.trim()) {
            Swal.fire({
                title: "단어장 이름",
                text: "단어장 이름을 입력해주세요",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                }
            });
            return;
        }

        const validWords = words.filter(
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

        const newVoca = {
            id: Date.now(),
            name,
            wordCount: validWords.length,
            createdAt: new Date().toISOString(),
            description,
            currentIdx: 0,
            words: validWords
        };
        onCreate(newVoca);

        Swal.fire({
            title: "단어장 저장",
            text: "단어장이 저장되었습니다!",
            icon: "success",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: 'no-focus-outline'
            }
        });
        
        navigate("/list");
    };

    return (
        <div className="new">
            <NewHeader
                name={name}
                description={description}
                onNameChange={(e) => setName(e.target.value)}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onCreateNewVoca={handleCreateNewVoca}
            />
            <NewContent words={words} setWords={setWords} />
        </div>
    );
};

export default New;