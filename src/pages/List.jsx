import { useRef } from "react";
import PageHeader from "../components/common/PageHeader";
import ListContent from "../components/list/ListContent";

const List = () => {
    const headerRef = useRef(null);

    return (
        <div className="list">
            <PageHeader ref={headerRef} />
            <ListContent />
        </div>
    );
};

export default List;