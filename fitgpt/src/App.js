import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Calendar from './Calendar';
import Main from './Main';
import Chat from "./Chat";
import Recommend from "./Recommend";
import Siginin from "./Siginin";
import Siginup from "./Siginup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Write" element={<Calendar />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Recommend" element={<Recommend />} />
          <Route path="/Siginin" element={<Siginin />} />
          <Route path="/Siginup" element={<Siginup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
