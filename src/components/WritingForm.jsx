import React from 'react';
import styled from 'styled-components';
import img from './../images/wirteBtn.svg';
import { Link, useNavigate } from 'react-router-dom';

function WritingForm() {
  const navigate = useNavigate();
  return (
    <StWirteBtn action="#" onSubmit={(e) => e.preventDefault()}>
      {/* <Link to="/write"> */}
      <button onClick={() => navigate('/write')}>
        <img src={img} alt="글쓰기 버튼 이미지" />
      </button>
      {/* </Link> */}
    </StWirteBtn>
  );
}
export default WritingForm;

// 스타일 컴포넌트
const btnColor = '#92a29c';
const btnWidth = '3.5rem';
const transitionWidth = '13.4375rem';
const StWirteBtn = styled.form`
  margin-top: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    width: ${btnWidth};
    height: ${btnWidth};
    background-color: ${btnColor};
    border-radius: ${btnWidth};
    border: none;
    transition: width 0.3s;
    &:hover {
      width: ${transitionWidth};
    }
  }
`;
