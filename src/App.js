import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./components/Body/Detail/Detail";
import Write from "./components/Body/Write/Write";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Board from "./components/Body/MainBoard/Board";
import Qna from "./components/Body/Qna/Qna";
import Login from "./components/Body/Login/Login";
import Register from "./components/Body/Login/Register";
import Edit from "./components/Body/Edit/Edit";
import MyPage from "./components/Body/MyPage/MyPage";

function App() {
  return (
    <Routes>
		<Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Board></Board>}></Route>
        <Route path="detail/:id" element={<Detail></Detail>}></Route>
        <Route path="edit/:id" element={<Edit></Edit>}></Route>
        <Route path="write" element={<Write></Write>}></Route>
        <Route path="qna" element={<Qna></Qna>}></Route>
        <Route path="mypage" element={<MyPage></MyPage>} />
      </Route>
    </Routes>
  );
}

export default App;
