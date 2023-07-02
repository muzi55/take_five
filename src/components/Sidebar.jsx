import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../style/HomeStyled';

const Sidebar = ({ width = 300, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글로 사이드바를 보여줍니다.
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width);
      await setOpen(false);
    }
  };
  // 클릭시 화면을 닫는 함수입니다.
  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  const navigate = useNavigate();

  return (
    <div>
      <S.sidebar
        // 사이드 바 너비만큼 transform을 적용해
        // 버튼을 이용하면 사이드바를 없어지도록 합니다.
        ref={side}
        style={{
          width: `${width}px`,
          height: '100%',
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        {/* signup을 누르면 회원가입 페이지로 들어갑니다.
       사이드바가 열리면 버튼은 사라집니다. */}
        <S.button
          onClick={() => {
            navigate('/register');
          }}
        >
          {isOpen ? <span></span> : <span>Sign up</span>}
        </S.button>
        {/* login을 누르면 토글메뉴 함수로 사이드바가 나타납니다.
        사이드바가 열리면'>>' 버튼으로 바뀝니다. */}
        <S.button onClick={() => toggleMenu()}>
          {isOpen ? (
            <span style={{ color: '#fff', fontSize: '30px' }}> &gt;&gt;</span>
          ) : (
            <span>Login</span>
          )}
        </S.button>

        <S.content>{children}</S.content>
      </S.sidebar>
    </div>
  );
};

export default Sidebar;
