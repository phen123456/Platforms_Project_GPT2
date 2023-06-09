import './App.css';
import './normal.css';
import logo from './logo.svg'
import {useState, useEffect} from 'react';


function App() {

  useEffect(() => {
    getEngines();
  }, [])

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("Babbage");


  const [chatLog, setChatLog] = useState([
    {
    user: "gpt",
    message: "How can I help you today?"
  }]);

  function clearChat(){
    setChatLog([]);
  }

  function getEngines(){
    fetch("http://localhost:3080/models")
    .then(res=>res.json())
    .then(data=>{
      console.log(data.models)
      setModels(data.models)})
  }


  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: input} ]
    setInput("");
    setChatLog(chatLogNew)

    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
  }

  return (
    <div className="App">
      {/* This is where we designed the side menu */}
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          New Chat
        </div>
        <div className="models">
          <select onChange={(e)=> {
            setCurrentModel(e.target.value)
          }}>
            {models.map((model,index) => (
              <option key={model.id} value={model.id}>
                {model.id}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message = {message} />
          ))}
        </div>
        <div
        className="chat-input-holder">
          <form onSubmit = {handleSubmit}> 
          <input
          rows="1"
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          className="chat-input-textarea"></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className = {`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <div className="chat-message-center">
              
              <div className = {`avatar ${message.user === "gpt" && "chatgpt"}`}>

                {message.user === "gpt" && <svg 
              
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 1200 1070"
            >
              <path d="M6 64.5v56.4l9.3 4.8c6.9 3.6 11.3 6.8 17.8 13 17.5 16.9 26.1 32.1 40.9 72.8 18.3 50.1 142 379.7 232 618 31.5 83.4 35 93.4 35.7 103 .5 6.5.4 7.3-2 10.1-1.6 1.9-6 4.6-11.2 6.9l-8.5 3.8V1064h563V954.1l-9.1-4.8c-5.1-2.6-9.9-5.9-10.8-7.3-2.4-3.6-1.8-14.6 1.4-25.4 1.4-4.9 16.6-46.1 33.6-91.5 137.3-365 215.9-575 230.9-616.6 4-11 9.2-24.3 11.7-29.5 12-25.8 28.6-44.8 47-54.3l8.3-4.2V8H677V121.7l7.8 2.8c15.3 5.4 21.2 9.8 25.3 18.9 3.6 7.9 1.8 17.5-7.9 42.1-3.2 8.2-27.2 71.6-53.2 140.7-26 69.2-47.6 125.8-47.9 125.8-1.2-.1-109.4-288.7-110.4-294.5-1.3-7.7-.4-12.2 3.7-18.2 4.2-6.3 10.1-10.1 21.4-14.2l9.2-3.3V8H6v56.5zm494 4V104l-7.2 3.6c-19.6 9.9-29.8 29.1-27 50.8.6 4.5 1.8 10.4 2.7 13.1 3.2 9.6 131.8 350 132.5 350.8.6.7 127.5-334.9 132.7-351.1 3.3-10.2 3.4-23.7.4-33.3-4-12.6-13.9-24.4-25.8-30.6l-5.3-2.8V33h468v71.9l-6.2 4.2c-9.8 6.5-24.5 22.1-33.1 35-9.5 14.2-15.7 27.4-24 50.4-15.5 42.9-84.7 227.9-198.7 531-34.8 92.4-64.5 171.9-66.1 176.6-6 18-7.7 34.9-4.4 45.6 2 6.6 7.9 14.1 14.4 18.4l5.1 3.2V1039H345v-70l4.1-2c5.7-2.9 12.7-10.2 15.2-15.8 2.6-5.9 3.4-18.8 1.7-27.5-.6-3.4-2.5-10.5-4.2-15.7-1.7-5.2-36.1-97.3-76.5-204.5C197.6 470.8 110.8 239.3 98 204c-11-30.6-17.6-44.7-27.8-60-8.6-13-24.2-29.2-33.5-35l-5.7-3.5V33h469v35.5z" />
              <path d="M97.3 75.7 76 76v3.4c0 2.9 1 4.4 6.6 9.8 12.7 12.1 25.9 29.5 35.1 46.3 6.9 12.5 12.1 24.3 18.8 43C149.3 214.2 261 512 356.5 765c50.8 134.3 51.9 137.4 54.7 149 2.5 10.2 3 27.7 1 36-2.5 10.2-8.9 21.6-16.4 29.2-6.7 6.8-6.9 7.1-6.6 11.7l.3 4.6 91-.3c50-.2 91.1-.4 91.3-.6.2-.2-79.7-207.1-177.6-459.7L216.3 75.5h-48.9c-26.9 0-58.5.1-70.1.2zM264.2 77.2c.5 2.3 334.4 858.1 335.8 860.7.5.9 4-6.8 9.8-21.5 5-12.6 82.2-206.9 171.6-431.7C870.8 259.8 944 75.6 944 75.4c0-.2-44.2-.3-98.2-.2l-98.3.3-.3 2.9c-.3 2.5.6 3.7 6.1 8.8 8.8 7.8 15.1 16.4 20.2 27.3 9.3 19.7 10.8 39.1 4.8 63.5-2.5 10.6-127.3 341.2-153.5 406.8-13.2 33.2-24.2 60.2-24.3 60-.2-.2-8.7-23.9-18.8-52.8-10.2-28.9-48.2-131.3-84.6-227.7-36.3-96.4-67.2-179.1-68.6-183.8-8.5-29.6-4.1-58 12.6-80.5 3.1-4.2 8.4-10 11.8-13 5.4-4.7 6.2-5.8 5.9-8.4l-.3-3.1-97.4-.3-97.3-.2.4 2.2zM990.3 78.7c-3.2 7.7-362.5 912.9-363 914.5-.5 1.7 4.5 1.8 94.6 1.8H817v-4.8c0-4.5-.3-5.1-6.8-11.8-7.8-8.1-13.2-18.1-15.8-28.9-2.1-9.3-1.4-26.7 1.6-38.5 1.2-4.7 34.6-94.7 74.2-200 82.4-219.1 161.6-430.6 183.7-490.5 8.4-22.6 17-46 19.3-52 11.6-31.4 25.7-54.3 46.5-75.6 9.3-9.5 10.3-10.9 10.3-14.2V75H991.9l-1.6 3.7z" />
            </svg>}
              </div>
              <div className="message">
                {message.message}
              </div>
            </div>
          </div>
  )
}


export default App;
