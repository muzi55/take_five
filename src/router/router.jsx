import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import EditProfile from '../pages/EditProfile';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="EditProfile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
