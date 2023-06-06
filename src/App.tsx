import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SocketsProvider from "./contexts/socketContext";
import GlobalStyle from "./style/globalStyle";
import { Routes, Route } from "react-router-dom";
import "reset-css";
function App(): JSX.Element {
  return (
    <SocketsProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </SocketsProvider>
  );
}

export default App;
