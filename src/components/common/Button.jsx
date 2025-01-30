import "./Button.css";

const Button = ({ text, type, onClick }) => {
    return (
        <button className={["button", `button-${type}`].join(" ")} onClick={onClick}>{text}</button>
    );
};

export default Button;