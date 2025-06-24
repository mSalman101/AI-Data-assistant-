import { useState } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from 'react-markdown';

const apiKey = import.meta.env.VITE_API;


function App() {
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");

  async function getAnswer() {
    console.log("loading...");
    
    console.log( question);
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      method: "post",
      data: {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      },
    });
    const ans =
      response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    setAns(ans);
    console.log(ans);
  }

  return (
    <>
      <h1 className="head1">Your AI Assistant</h1>
      <h2 className="head2">{<ReactMarkdown>{ans}</ReactMarkdown>|| "How may I assist You "}</h2>
      <div className="box">
        <div className="input-group py-3 my-4">
          <textarea
            className="form-control"
            id="questionInput"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button
            type="button"
            id="get"
            className="btn btn-secondary bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-white rounded-r-xl px-4 py-2
"
            onClick={getAnswer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="white"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
