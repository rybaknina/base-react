import "./App.scss";
import Message from "./components/Message";
import {useEffect, useRef, useState} from "react";
import _uniqueId from 'lodash/uniqueId';
import {AUTHOR, BOT_ANSWER, TIME_IN_SECONDS} from "./constants/common";

function App() {
    const [messageList, setMessageList] = useState([]);
    const [messageText, setMessageText] = useState("");
    const textInput = useRef();


    useEffect(() => {
        textInput.current.focus();
        let len = messageList.length;
        if (len < 1 || messageList[len - 1].author === AUTHOR.bot) {
            return;
        }

        const timerId = setInterval(() => {
            const text = BOT_ANSWER + messageList[len - 1].id;
            setMessageList(prevState => [...prevState,
                {
                    id: _uniqueId("msg_"),
                    author: AUTHOR.bot,
                    text
                }
            ]);
        }, TIME_IN_SECONDS);

        setTimeout(() => timerId);

        return () => clearInterval(timerId);

    }, [messageList])

    const handleClick = (event) => {
        event.preventDefault();
        setMessageList(prevState => [...prevState,
            {
                id: _uniqueId("msg_"),
                author: AUTHOR.me,
                text: messageText
            }
        ]);
        setMessageText("");
    };

    const handleChange = (event) => {
        setMessageText(event.target.value);
    }

    return (
        <div className="App">
            <main>
                <form className="MessageForm" action="#">
                    <input ref={textInput}
                           className="MessageForm-input"
                           type="text"
                           placeholder={"текст сообщения"}
                           value={messageText}
                           onChange={handleChange}
                    />
                    <button className="AddButton" onClick={handleClick}>Add Message</button>
                </form>
                <section>
                    <h4 className="App-text">Список сообщений</h4>
                    {messageList.slice(0).reverse().map(message => (
                        <Message key={message.id} message={message}/>
                    ))}
                </section>
            </main>

        </div>
    );
}

export default App;
