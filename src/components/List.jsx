import { useState } from "react";
import { Send, Trash } from "react-feather";
import PropTypes from "prop-types";
import { Grid, FileText, Image, Video, Mic, Paperclip } from "react-feather";

function List({ itens, onDeleteItem, onSendItem }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const getIconByType = (type) => {
    switch (type) {
      case "audio":
        return <Mic />;
      case "image":
        return <Image />;
      case "video":
        return <Video />;
      case "text":
        return <FileText />;
      default:
        return <Paperclip />;
    }
  };

  const filteredItems = itens.filter((item) => {
    const nameMatch = item.templateName
      .toLowerCase()
      .includes(search.toLowerCase());
    const typeMatch =
      selectedType === "all" || item.templateType === selectedType;
    return nameMatch && typeMatch;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <button onClick={() => setSelectedType("all")}>
          <Grid />
        </button>
        <button onClick={() => setSelectedType("text")}>
          <FileText />
        </button>
        <button onClick={() => setSelectedType("imagem")}>
          <Image />
        </button>
        <button onClick={() => setSelectedType("video")}>
          <Video />
        </button>
        <button onClick={() => setSelectedType("audio")}>
          <Mic />
        </button>
        <input
          type="text"
          placeholder="Filtrar por nome"
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "180px",
            height: "30px",
            fontSize: "14px",
            background: "white",
            borderRadius: "50px",
            border: "1px solid black",
            padding: "0 20px",
            color: "black",
          }}
        />
      </div>
      <div>
        {filteredItems
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {getIconByType(item.templateType)}
                <h6 style={{ marginLeft: "20px" }}>{item.templateName}</h6>
              </div>
              <div>
                <button onClick={() => onSendItem(item)}>
                  <Send />
                </button>
                <button onClick={() => onDeleteItem(item._id)}>
                  <Trash />
                </button>
              </div>
            </li>
          ))}
      </div>
    </>
  );
}

List.propTypes = {
  itens: PropTypes.array.isRequired,
  phoneList: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onSendItem: PropTypes.func,
};

export default List;
