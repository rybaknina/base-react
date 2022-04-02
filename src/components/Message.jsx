import "./Message.scss";

const Message = ({message}) => {
    return (
        <>
            <p className="MessageAuthor">{message.author}({message.id}): &nbsp;
                <span className="MessageText">
                    <q>{message.text}</q>
                </span>
            </p>
        </>
    );
};

export default Message;