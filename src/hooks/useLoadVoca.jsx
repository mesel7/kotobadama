import { useCallback } from "react";
import { useContext } from "react";
import { VocaDispatchContext } from "../contexts/VocaContext";
import Swal from "sweetalert2";

const useLoadVoca = () => {
    const { onCreate, onUpdate } = useContext(VocaDispatchContext);

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject("파일을 읽는 중 오류가 발생했습니다");
        });
    };

    const loadVocaFromFile = useCallback(async (e, vocaList) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        if (file.type !== "application/json") {
            await Swal.fire({
                title: "오류",
                text: "JSON 파일만 불러올 수 있습니다",
                icon: "error",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline',
                },
            });
            return;
        }

        const fileContent = await readFileAsync(file).catch(async (error) => {
            await Swal.fire({
                title: "오류",
                text: error,
                icon: "error",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline',
                },
            });
            return null;
        });

        if (!fileContent) {
            return;
        }

        const importedVoca = JSON.parse(fileContent);
        const existingVoca = vocaList.find((voca) => String(voca.id) === String(importedVoca.id));

        if (existingVoca) {
            const result = await Swal.fire({
                title: "단어장 중복",
                text: "덮어쓸까요?",
                icon: "warning",
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

            if (!result.isConfirmed) {
                return;
            }

            onUpdate(importedVoca);
            await Swal.fire({
                title: "덮어쓰기 완료",
                text: "기존 단어장을 덮어썼습니다",
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline',
                },
            });
        } else {
            onCreate(importedVoca);
            await Swal.fire({
                title: "불러오기 완료",
                text: "새로운 단어장이 추가되었습니다",
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline',
                },
            });
        }
    }, [onCreate, onUpdate]);

    return { loadVocaFromFile };
};

export default useLoadVoca;