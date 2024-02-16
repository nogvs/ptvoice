import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import api from "../Axios";
import * as XLSX from "xlsx";

function Home() {
  const [itens, setItens] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const sessionId = localStorage.getItem("SESSION_ID");

  const resetTextInput = () => {
    setContactList("");
    setPhoneList([]);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.trim() !== "") {
      const inputNumbers = inputValue.split(",").map((number) => number.trim());
      const formattedContactList = inputNumbers
        .map((number) => number)
        .join(", ");
      setContactList(formattedContactList);
      setPhoneList(inputNumbers);
    } else {
      setContactList("");
      setPhoneList([]);
    }
  };

  const handleDeleteItem = async (itemId) => {
    api
      .delete(`/template/deleteTemplate/${itemId}/${sessionId}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setItens(response.data);
      });
  };

  const handleSendItem = (item) => {
    console.log("entrou no handleSendItem", item);
    phoneList.map((phone) => {
      if (item.templateType === "audio") {
        console.log("entrou no audio");

        const payload = {
          chatId: `${phone}@c.us`,
          content: item.content,
          contentType: "MessageMedia",
          options: item.options,
        };

        api
          .post(`client/sendMessage/${sessionId}`, payload, {
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      } else if (
        item.templateType === "image" ||
        item.templateType === "video"
      ) {
        const payload = {
          chatId: `${phone}@c.us`,
          content: item.content,
          contentType: "MessageMedia",
          options: item.options,
        };

        api
          .post(`client/sendMessage/${sessionId}`, payload, {
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      } else if (item.templateType === "text") {
        console.log("entrou no text");
        const payload = {
          chatId: `${phone}@c.us`,
          content: item.content,
          contentType: "string",
          options: {},
        };

        api
          .post(`client/sendMessage/${sessionId}`, payload, {
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      } else {
        console.log(`Tipo não reconhecido: ${item.type}`);
      }
    });

    resetTextInput();
  };

  const processExcel = () => {
    const input = document.getElementById("excelFile");
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const filteredContactListData = jsonData
          .filter((row) => row.nome && row.contacto)
          .map((row) => `${row.nome}(${row.contacto})`);

        const formattedContactList = filteredContactListData.join(", ");

        setContactList(formattedContactList);

        const filteredPhoneListData = jsonData
          .filter((row) => row.contacto)
          .map((row) => `${row.contacto}`);

        setPhoneList(filteredPhoneListData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    api
      .get(`template/getAll/${sessionId}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setItens(response.data);
      });
  }, [sessionId]);

  return (
    <>
      <div className="card">
        <h3>Contactos</h3>
        <form
          id="excelForm"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <input type="file" id="excelFile" accept=".xlsx" />
          <button
            type="button"
            onClick={() => processExcel()}
            style={{ width: "250px" }}
          >
            Processar Arquivo
          </button>

          <textarea
            rows="10"
            cols="80"
            type="text"
            id="contactList"
            value={contactList}
            onChange={handleChange}
            placeholder="Se de forma manual, insira os números separados por vírgula."
          />
        </form>
      </div>

      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Templates</h3>
        <Link to="/actions">
          <button>Criar Novo</button>
        </Link>
      </div>

      <div className="card">
        <List
          itens={itens}
          phoneList={phoneList}
          onDeleteItem={handleDeleteItem}
          onSendItem={handleSendItem}
        />
      </div>
    </>
  );
}

export default Home;
