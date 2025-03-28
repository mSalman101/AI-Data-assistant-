import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [ans, setAns] = useState("");

  async function getAnswer() {
    console.log("loading...");
    const condition =
      "You are an AI assistant designed **ONLY** for data analysis. You will **NOT** answer any questions that are unrelated to data analysis. If asked about anything else, politely respond: I can only help with data analysis tasks.";
    console.log(condition + question);
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
        import.meta.env.VITE_API
      }`,
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
    console.log(ans + "Grateful");
  }

  return (
    <>
      <h1 className="head1">Your AI Assistant</h1>
      <h4 className="head2">{ans || "How may I assist You "}</h4>
      <div className="box">
        <div className="input-group mb-3">
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
            className="btn btn-secondary"
            onClick={getAnswer}
          >
            Ask!
          </button>
        </div>
        <p>Response: {response}</p>
      </div>
    </>
  );
}

export default App;
