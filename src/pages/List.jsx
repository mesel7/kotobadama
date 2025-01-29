import { useContext } from "react";
import PageHeader from "../components/common/PageHeader";
import ListContent from "../components/list/ListContent";
import { VocaStateContext } from "../contexts/VocaContext";

const List = () => {
    const state = useContext(VocaStateContext);
    return (
        <div className="list">
            <PageHeader />
            <ListContent vocaList={state} />
        </div>
    );
};

export default List;