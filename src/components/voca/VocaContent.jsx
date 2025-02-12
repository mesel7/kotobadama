import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./VocaContent.css";
import { icons } from "../../utils";
import { useEffect } from "react";
import Swal from "sweetalert2";

const VocaContent = ({ words, wordCount, currentIdx, onChangeIdx, displayOption, filterOption, onChangeFilterOption, onStatusChange }) => {
    /*
    useEffect(() => {
        const askStartPosition = async () => {
            const result = await Swal.fire({
                title: "시작 위치",
                text: "마지막으로 본 단어부터 볼까요?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "확인",
                cancelButtonText: "처음부터",
                showCloseButton: true,
                reverseButtons: true,
                customClass: {
                    confirmButton: 'no-focus-outline',
                    cancelButton: 'no-focus-outline'
                },
            });
            
            // 취소 버튼(처음부터)을 눌렀을 때만 0으로 설정
            if (result.dismiss === Swal.DismissReason.cancel) {
                onChangeIdx(0);
            }
        };

        // 시작 인덱스가 0(처음)이 아닐 때만 호출해서 물어봄
        if (currentIdx !== 0) {
            askStartPosition();
        }
    }, []);
    */

    // filter(모르는 단어만, 모든 단어)에 따라 단어 인덱스 조정 등 필요한 처리
    useEffect(() => {
        if (filterOption) {
            const allKnown = words.every(word => word.status === "known");
            if (allKnown) {
                Swal.fire({
                    title: "알림",
                    text: "모르는 단어가 없어서 모든 단어를 표시합니다",
                    icon: "info",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline',
                    },
                });

                onChangeFilterOption(false);
            } else {
                // 모르는 단어가 1개 이상 있을 때
                if (words[currentIdx]?.status === "known") {
                    const nextIdx = words.findIndex((word, idx) => idx > currentIdx && word.status !== "known");
                    if (nextIdx !== -1) {
                        onChangeIdx(nextIdx);
                    }
                }
            }
        }
    }, [filterOption]);

    // 현재 인덱스로부터 뒤로 출발해서 가장 가까운 모르는 단어의 인덱스로 이동
    const findPrevUnknownIdx = (startIdx) => {
        for (let i = startIdx - 1; i >= -startIdx - 1; i--) {
            const idx = (i + wordCount) % wordCount; // 음수 인덱스 처리
            if (words[idx].status !== "known") {
                return idx;
            }
        }
        return -1;
    };

    // 현재 인덱스로부터 앞으로 출발해서 가장 가까운 모르는 단어의 인덱스로 이동
    const findNextUnknownIdx = (startIdx) => {
        for (let i = startIdx + 1; i < wordCount + startIdx + 1; i++) {
            const idx = i % wordCount;
            if (words[idx].status !== "known") {
                return idx;
            }
        }
        return -1;
    };

    const handlePrevClick = () => {
        if (filterOption) {
            const prevIdx = findPrevUnknownIdx(currentIdx);
            if (prevIdx !== -1) {
                onChangeIdx(prevIdx);
            } else {
                Swal.fire({
                    title: "알림",
                    text: "모르는 단어가 없어서 모든 단어를 표시합니다",
                    icon: "info",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline',
                    },
                });
                onChangeFilterOption(false);
            }
        } else {
            if (currentIdx <= 0) {
                onChangeIdx(wordCount - 1);
            } else {
                onChangeIdx(prev => prev - 1);
            }
        }
    };

    const handleNextClick = () => {
        if (filterOption) {
            const nextIdx = findNextUnknownIdx(currentIdx);
            if (nextIdx !== -1) {
                onChangeIdx(nextIdx);
            } else {
                Swal.fire({
                    title: "알림",
                    text: "모르는 단어가 없어서 모든 단어를 표시합니다",
                    icon: "info",
                    confirmButtonText: "확인",
                    customClass: {
                        confirmButton: 'no-focus-outline',
                    },
                });
                onChangeFilterOption(false);
            }
        } else {
            if (currentIdx >= wordCount - 1) {
                onChangeIdx(0);
            } else {
                onChangeIdx(prev => prev + 1);
            }
        }
    };

    return (
        <div className="voca-content">
            <div className="word-wrapper">
                <div
                    className="word-kana"
                    style={{ opacity: displayOption.wordKana ? 1 : 0 }}
                >
                    {words[currentIdx].wordKana}
                </div>
                <div
                    className="word-kanji"
                    style={{ opacity: displayOption.wordKanji ? 1 : 0 }}
                >
                    {words[currentIdx].wordKanji}
                </div>
                <div
                    className="meaning"
                    style={{ opacity: displayOption.meaning ? 1 : 0 }}
                >
                    {words[currentIdx].meaning}
                </div>
            </div>
            <div className="menu-wrapper">
                <FontAwesomeIcon
                    className="prev-word"
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer", fontSize: "24px", padding: "15px", paddingLeft: "0px" }}
                    onClick={handlePrevClick}
                />
                <div className="button-wrapper">
                    <Button
                        text={"외움"}
                        type={words[currentIdx].status === "known" ? "default" : "light"}
                        onClick={() => onStatusChange("known", currentIdx)}
                    />
                    <Button
                        text={"반쯤"}
                        type={words[currentIdx].status === "partial" ? "default" : "light"}
                        onClick={() => onStatusChange("partial", currentIdx)}
                    />
                    <Button
                        text={"모름"}
                        type={words[currentIdx].status === "unknown" ? "default" : "light"}
                        onClick={() => onStatusChange("unknown", currentIdx)}
                    />
                </div>
                <FontAwesomeIcon
                    className="next-word"
                    icon={icons.faAngleRight}
                    style={{ color: "white", cursor: "pointer", fontSize: "24px", padding: "15px", paddingRight: "0px" }}
                    onClick={handleNextClick}
                />
            </div>
        </div>
    );
};

export default VocaContent;