import api from "../Axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function Text() {
  const [message, setMessage] = useState("");
  const [templateName, setTemplateName] = useState("");
  const sessionId = localStorage.getItem("SESSION_ID");
  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      templateName: templateName,
      templateType: "text",
      content: message,
      contentType: "string",
      options: {},
    };

    api
      .post(`/template/createTemplate/${sessionId}`, payload, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
      });

    navigate("/home");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="text">Nome do Template de Text</label>
          <input
            type="text"
            id="templateName"
            onChange={handleTemplateNameChange}
          />

          <label htmlFor="mediaFile">Mensagem</label>
          <textarea
            rows="5"
            cols="40"
            type="text"
            id="caption"
            onChange={handleMessageChange}
          />

          <button type="button" onClick={handleSubmit}>
            Salvar
          </button>
          <Link to="/actions">
            <button style={{ marginRight: "10px" }}>
              <ArrowLeft size={20} />
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Text;
