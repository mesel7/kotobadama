import React, { useReducer } from "react"

export const VocaStateContext = React.createContext();
export const VocaDispatchContext = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case "INIT": return action.data;
        case "CREATE": return action.data;
        case "UPDATE": return action.data;
        case "DELETE": return action.data;
        default: return state;
    }
};

export const VocaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <>
            <VocaStateContext.Provider value={state}>
                <VocaDispatchContext.Provider>
                    {children}
                </VocaDispatchContext.Provider>
            </VocaStateContext.Provider>
        </>
    );
};