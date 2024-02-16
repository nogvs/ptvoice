import api from "../Axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function Audio() {
  const [templateName, setTemplateName] = useState("");
  const [filename, setFileName] = useState("");
  const [filesize, setFileSize] = useState("");
  const [mimetype, setMimeType] = useState("");
  const [data, setData] = useState("");
  const sessionId = localStorage.getItem("SESSION_ID");

  const navigate = useNavigate();

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleAudioFileChange = (e) => {
    const audioFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", audioFile);
    setFileName(audioFile.name);
    setFileSize(audioFile.size);
    setMimeType(audioFile.type);

    if (audioFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];

        setData(base64Data);
      };

      reader.readAsDataURL(audioFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      templateName: templateName,
      templateType: "audio",
      content: {
        mimetype: mimetype,
        data: data,
        filename: filename,
        filesize: filesize,
      },
      options: { sendAudioAsVoice: true },
      contentType: "MessageMedia",
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
            padding: "20px",
          }}
        >
          <label htmlFor="templateName">Nome do Template de Áudio</label>
          <input
            type="text"
            id="templateName"
            onChange={handleTemplateNameChange}
          />

          <label htmlFor="AudioFile">Arquivo de Áudio (formato .ogg)</label>
          <input
            type="file"
            id="audioFile"
            accept=".ogg"
            onChange={handleAudioFileChange}
          />

          <button type="button" onClick={handleSubmit}>
            Salvar
          </button>
          <Link to="/actions">
            <button>
              <ArrowLeft size={20} />
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Audio;
