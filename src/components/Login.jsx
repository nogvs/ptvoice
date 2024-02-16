import QRCode from "qrcode.react";
import { useState } from "react";
import api from "../Axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [sessionId, setSessionId] = useState("");
  const [qrCode, setQRCode] = useState("");
  const navigate = useNavigate();

  const createWhatsappSession = () => {
    console.log("entrou no create");
    api
      .get(`/session/start/${sessionId}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const generateQRCode = () => {
    api
      .get(`/session/qr/${sessionId}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setQRCode(response.data.qr);
        } else {
          alert("QR Code não foi gerado, aguarde e tente novamente.");
        }
      });
  };

  const sessionStatus = () => {
    api
      .get(`/session/status/${sessionId}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem("SESSION_ID", sessionId);
          navigate("/home");
        } else {
          alert("Sessão não está conectada, aguarde e tente novamente.");
        }
      });
  };

  return (
    <>
      <div>
        <h1>PT Voice</h1>
      </div>
      <div className="card">
        <input
          style={{ width: "250px", marginRight: "20px" }}
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
        <button onClick={() => createWhatsappSession()}> Criar Sessão</button>
      </div>
      <div>
        <button onClick={() => generateQRCode()}> Gerar QR Code</button>
      </div>

      {qrCode && (
        <div className="card">
          <QRCode value={qrCode} />
        </div>
      )}

      <div className="card">
        <button onClick={() => sessionStatus()}>
          Verificar Status da Sessão
        </button>
      </div>
    </>
  );
}

export default Login;
