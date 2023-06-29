import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from '../pages/List';
import Home from '../pages/Home';
import Write from '../pages/Write';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import EditProfile from '../pages/EditProfile';
// import List from './../components/List';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="write" element={<Write />} />
        <Route path="detail" element={<Detail />} />
        <Route path="detail/:email" element={<Detail />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="EditProfile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
