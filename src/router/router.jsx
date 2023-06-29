import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from '../pages/List';
import Home from '../pages/Home';
import Write from '../pages/Write';
import Detail from '../pages/Detail';

// import List from './../components/List';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="write" element={<Write />} />
        <Route path="detail" element={<Detail />} />
        <Route path="detail/:email" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
