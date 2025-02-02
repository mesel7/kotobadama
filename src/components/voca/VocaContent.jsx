import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import "./VocaContent.css";
import { icons } from "../../utils";
import { useEffect } from "react";
import Swal from "sweetalert2";

const VocaContent = ({ words, wordCount, currentIdx, onChangeIdx, displayOption, onStatusChange }) => {
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

    const handlePrevClick = () => {
        if (currentIdx > 0) {
            onChangeIdx(prev => prev - 1);
        } else {
            Swal.fire({
                title: "첫 번째 단어",
                text: "첫 번째 단어입니다",
                icon: "info",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                }
            });
        }
    };

    const handleNextClick = () => {
        if (currentIdx < wordCount - 1) {
            onChangeIdx(prev => prev + 1);
        } else {
            Swal.fire({
                title: "마지막 단어",
                text: "마지막 단어입니다",
                icon: "info",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                }
            });
        }
    };

    return (
        <div className="voca-content">
            <div className="word-wrapper">
                <div
                    className="word-kana"
                    style={{ visibility: displayOption.wordKana ? "visible" : "hidden"}}
                >
                    {words[currentIdx].wordKana}
                </div>
                <div
                    className="word-kanji"
                    style={{ visibility: displayOption.wordKanji ? "visible" : "hidden"}}
                >
                    {words[currentIdx].wordKanji}
                </div>
                <div
                    className="meaning"
                    style={{ visibility: displayOption.meaning ? "visible" : "hidden"}}
                >
                    {words[currentIdx].meaning}
                </div>
            </div>
            <div className="menu-wrapper">
                <FontAwesomeIcon
                    icon={icons.faAngleLeft}
                    style={{ color: "white", cursor: "pointer" }}
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
                    icon={icons.faAngleRight}
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handleNextClick}
                />
            </div>
        </div>
    );
};

export default VocaContent;