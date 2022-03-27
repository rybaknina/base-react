import './App.scss';
import Message from "./Message";

function App() {
    const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo incidunt minima neque velit? Adipisci consequatur dicta, dolor eligendi, in ipsam magni nihil numquam pariatur porro quos repellendus sint tempore veritatis?";
    return (
        <div className="App">
            <Message text={text}/>
        </div>
    );
}

export default App;
