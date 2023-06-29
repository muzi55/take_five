import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import EditPage from "../pages/EditPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
