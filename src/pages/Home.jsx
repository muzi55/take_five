import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  // const { user } = useUserState();
  const navigate = useNavigate();

  // useNavigate
  return (
    <div>
      <>
        여기서부터 시작입니다 !<br />
        <button
          onClick={() => {
            navigate('/Mypage');
          }}
        >
          Mypage로 이동
        </button>
      </>
    </div>
  );
}

export default Home;
