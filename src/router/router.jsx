import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EditPage from "../pages/EditPage";
import Mypage from "../pages/Mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
