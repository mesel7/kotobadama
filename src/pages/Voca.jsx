import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VocaDispatchContext, VocaStateContext } from "../contexts/VocaContext";
import Swal from "sweetalert2";
import VocaHeader from "../components/voca/VocaHeader";
import VocaContent from "../components/voca/VocaContent";
import VocaBottom from "../components/voca/VocaBottom";

const Voca = () => {
    const state = useContext(VocaStateContext);
    const { onUpdate } = useContext(VocaDispatchContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // context에서 가져온 모든 단어장 객체 배열에서 id에 맞는 단어장 객체 하나를 관리
    const [voca, setVoca] = useState({});

    // 단어장 객체 속 단어 배열을 로컬 state로 관리하여 업데이트(단어장 객체 업데이트 시 이 데이터로 단어장 배열 업데이트)
    const [localWords, setLocalWords] = useState([]);

    // 개별 단어 페이지에서 한자, 가나, 뜻의 표시 여부를 관리
    const [displayOption, setDisplayOption] = useState({
        wordKanji: true,
        wordKana: false,
        meaning: false
    });

    // 개별 단어 페이지에서 모르는 단어만 표시, 모든 단어 표시 여부를 관리
    const [filter, setFilter] = useState(true);

    // 현재 보고 있는 단어의 인덱스 번호를 관리
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        if (state.length === 0) {
            return;
        }

        const vocaData = state.find((it) => String(it.id) === String(id));
        if (vocaData) {
            setVoca(vocaData);
            setLocalWords(vocaData.words);
            setCurrentIdx(vocaData.currentIdx);
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

    // VocaHeader에 전달되어 버튼(한자, 가나, 뜻) 클릭을 통해 displayOption의 상태를 변경
    const handleDisplayOption = (field) => {
        setDisplayOption((prev) => {
            const newState = { ...prev, [field]: !prev[field] };
            if (Object.values(newState).every(value => !value)) {
                return prev;
            }
    
            return newState;
        });
    };    

    // VocaContent에 전달되어 특정 인덱스의 단어의 상태(외움, 반쯤, 모름)를 변경
    const handleStatusChange = (status, index) => {
        setLocalWords((prev) => 
            prev.map((it, idx) => (idx === index ? { ...it, status} : it))
        );
    };

    const handleSaveAndExit = async () => {
        const result = await Swal.fire({
            title: "돌아가기",
            text: "학습한 내용을 저장하고 돌아갈까요?",
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
            onUpdate({ ...voca, currentIdx, words: localWords });
            navigate(-1);
        }
    };
    
    if (!isDataLoaded) {
        return <div>데이터를 불러오는 중이에요</div>;
    } else {
        return (
            <div className="voca">
                <VocaHeader
                    vocaName={voca.name}
                    currentIdx={currentIdx}
                    wordCount={voca.wordCount}
                    displayOption={displayOption}
                    onClickDisplayOption={handleDisplayOption}
                    filterOption={filter}
                    onClickFilterOption={setFilter}
                    onSaveAndExit={handleSaveAndExit}
                />
                <VocaContent
                    words={localWords}
                    wordCount={voca.wordCount}
                    currentIdx={currentIdx}
                    onChangeIdx={setCurrentIdx}
                    displayOption={displayOption}
                    setDisplayOption={setDisplayOption}
                    filterOption={filter}
                    onChangeFilterOption={setFilter}
                    onStatusChange={handleStatusChange}
                />
                <VocaBottom
                    displayOption={displayOption}
                    onClickDisplayOption={handleDisplayOption}
                />
            </div>
        );
    }
};

export default Voca;