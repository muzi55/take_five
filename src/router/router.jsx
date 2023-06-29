import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from '../pages/List';
import Home from '../pages/Home';
import Write from '../pages/Write';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import EditProfile from '../pages/EditProfile';
import Register from '../pages/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Mypage />} /> */}
        {/* <Route path="/" element={<EditProfile />} /> */}
        {/* <Route path="/" element={<Mypage />} /> */}
        {/*
         */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:email" element={<Detail />} />
        <Route path="/mypage/:email" element={<Mypage />} />
        <Route path="/editprofile/:email" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
