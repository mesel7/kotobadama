import kotobadamaLogo from "../../assets/images/img_kotobadama_logo.png";
import "./PageHeader.css";

const PageHeader = () => {
    return (
        <div className="page-header">
            <div className="logo-wrapper">
                <img alt={"LOGO"} src={kotobadamaLogo} />
            </div>
        </div>
    );
};

export default PageHeader;