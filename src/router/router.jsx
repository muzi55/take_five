import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from '../pages/List';
import Write from '../pages/Write';

// import List from './../components/List';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        {/* <Route path="/write" element={<Home />} /> */}
        <Route path="/write" element={<Write />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
