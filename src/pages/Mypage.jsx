import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      mypage
      <br />
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Home으로 이동
      </button>
      <br />
      <Link to="/EditProfile">프로필수정 이동하기</Link>
    </div>
  );
}

export default Mypage;
