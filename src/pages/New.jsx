import { useContext } from "react";
import NewContent from "../components/new/NewContent";
import NewHeader from "../components/new/NewHeader";
import { VocaDispatchContext } from "../contexts/VocaContext";

const New = () => {
    const { onCreate } = useContext(VocaDispatchContext);

    return (
        <div className="new">
            <NewHeader onCreateNewVoca={onCreate} />
            <NewContent />
        </div>
    );
};

export default New;