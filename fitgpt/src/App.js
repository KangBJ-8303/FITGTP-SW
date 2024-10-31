import { Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar';
import Main from './Main';
import Chat from "./Chat";
import Recommend from "./Recommend";
import Signin from './Siginin';
import Signup from "./Siginup";
function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Write" element={<Calendar />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Recommend" element={<Recommend />} />
        <Route path = "/signin" element={<Signin/>}/>
        <Route path = "/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
