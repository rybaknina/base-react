import "./Message.scss";

const Message = ({ text }) => {
    return (
        <div>
            <h2 className="MessageText">{text}</h2>
        </div>
    );
};

export default Message;