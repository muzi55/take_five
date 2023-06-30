import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from '../pages/List';
import Home from '../pages/Home';
import Write from '../pages/Write';
import Detail from '../pages/Detail';
import MyPage from '../pages/MyPage';
import EditProfile from '../pages/EditProfile';
import Register from '../pages/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<List />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:email" element={<Detail />} />
        <Route path="/mypage/:email" element={<MyPage />} />
        <Route path="/editprofile/:email" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
