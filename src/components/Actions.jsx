// BotoesPage.jsx
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function Actions() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h3>Criar novo template</h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <Link to="/texto">
              <button style={{ padding: "10px 30px", margin: "10px" }}>
                Texto
              </button>
            </Link>
            <Link to="/video">
              <button style={{ padding: "10px 30px", margin: "10px" }}>
                Vídeo
              </button>
            </Link>
          </div>
          <div>
            <Link to="/imagem">
              <button style={{ padding: "10px 30px", margin: "10px" }}>
                Imagem
              </button>
            </Link>
            <Link to="/audio">
              <button style={{ padding: "10px 30px", margin: "10px" }}>
                Áudio
              </button>
            </Link>
          </div>
          <Link to="/">
            <button>
              <ArrowLeft size={20} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Actions;
