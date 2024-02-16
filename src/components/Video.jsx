import api from "../Axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function Media() {
  const [templateName, setTemplateName] = useState("");
  const [filename, setFileName] = useState("");
  const [filesize, setFileSize] = useState("");
  const [mimetype, setMimeType] = useState("");
  const [data, setData] = useState("");
  const [caption, setCaption] = useState("");
  const sessionId = localStorage.getItem("SESSION_ID");

  const navigate = useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleMediaFileChange = (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    setFileName(imageFile.name);
    setFileSize(imageFile.size);
    setMimeType(imageFile.type);

    if (imageFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];

        setData(base64Data);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      templateName: templateName,
      templateType: "video",
      content: {
        mimetype: mimetype,
        data: data,
        filename: filename,
        filesize: filesize,
      },
      options: { caption: caption },
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
          }}
        >
          <label htmlFor="phoneList">Nome do Template de Vídeo</label>
          <input
            type="text"
            id="templateName"
            onChange={handleTemplateNameChange}
          />

          <label htmlFor="mediaFile">Arquivo de Vídeo</label>
          <input
            type="file"
            id="mediaFile"
            accept="*"
            onChange={handleMediaFileChange}
          />

          <label htmlFor="mediaFile">Legenda (opcional)</label>
          <textarea
            rows="5"
            cols="40"
            type="text"
            id="caption"
            onChange={handleCaptionChange}
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

export default Media;
