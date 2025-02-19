import { useCallback } from "react";
import Swal from "sweetalert2";

const useSaveVoca = () => {
    const saveVocaToFile = useCallback((id) => {
        const vocaList = JSON.parse(localStorage.getItem("vocaList")) || [];
        const voca = vocaList.find((it) => String(it.id) === String(id));

        if (!voca) {
            Swal.fire({
                title: "오류",
                text: "단어장을 찾을 수 없습니다",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                }
            });
            return;
        }

        const jsonString = JSON.stringify(voca);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${voca.name || "voca"}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Swal.fire({
            title: "저장 완료!",
            text: "단어장이 JSON 파일로 저장되었습니다",
            icon: "success",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: 'no-focus-outline'
            }
        });        
    }, []);

    return { saveVocaToFile };
};

export default useSaveVoca;