import React, { useEffect, useReducer } from "react"

export const VocaStateContext = React.createContext();
export const VocaDispatchContext = React.createContext();

/*
const mockData = [
    {
        id: 0,
        name: "sample",
        wordCount: 2,
        createdAt: "25.01.26",
        description: "JLPT",
        currentIdx: 0,
        words: [
            {
                wordKanji: "行く",
                wordKana: "いく",
                meaning: "가다",
                status: "known(외움)/partial(반쯤)/unknown(모름)"
            },
            {
                wordKanji: "心",
                wordKana: "こころ",
                meaning: "마음",
                status: "known"
            }
        ]
    },
    {}
];
*/

const reducer = (state, action) => {
    switch(action.type) {
        case "INIT": {
            const vocaList = localStorage.getItem("vocaList");
            if (vocaList) {
                const newState = JSON.parse(vocaList);
                return newState;
            } else {
                return action.data;
            }
        }

        case "CREATE": {
            const newState = [...state, action.data];
            localStorage.setItem("vocaList", JSON.stringify(newState));
            return newState;
        }

        case "UPDATE": {
            const newState = state.map((it) => 
                String(it.id) === String(action.data.id) ? action.data : it
            );
            localStorage.setItem("vocaList", JSON.stringify(newState));
            return newState;
        }

        case "DELETE": {
            const newState = state.filter((it) => 
                String(it.id) !== String(action.data.id)
            );
            localStorage.setItem("vocaList", JSON.stringify(newState));
            return newState;
        }
        default: {
            return state;
        }
    }
};

export const VocaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        dispatch({ type: "INIT", data: [] });
    }, []);

    // 단어장 1개 생성
    const onCreate = (newVoca) => {
        dispatch({ type: "CREATE", data: newVoca });
    };

    // 단어장 1개 업데이트(수정)
    const onUpdate = (targetVoca) => {
        dispatch({ type: "UPDATE", data: targetVoca });
    };

    // 단어장 1개 삭제
    const onDelete = (targetVoca) => {
        dispatch({ type: "DELETE", data: targetVoca });
    };

    return (
        <>
            <VocaStateContext.Provider value={state}>
                <VocaDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
                    {children}
                </VocaDispatchContext.Provider>
            </VocaStateContext.Provider>
        </>
    );
};