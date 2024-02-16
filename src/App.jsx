import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Actions from "./components/Actions";
import Text from "./components/Text";
import Video from "./components/Video";
import Image from "./components/Image";
import Audio from "./components/Audio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/texto" element={<Text />} />
        <Route path="/imagem" element={<Image />} />
        <Route path="/video" element={<Video />} />
        <Route path="/audio" element={<Audio />} />
      </Routes>
    </Router>
  );
}

export default App;
