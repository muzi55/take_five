import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { styled } from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

function Write() {
  // input value
  const navigate = useNavigate();
  const [infos, setInfos] = useState([]);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [motive, setMotive] = useState('');
  const [grow, setGrow] = useState('');
  const [goodBad, setGoodBad] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // 사용자 이메일 가져오기
  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      setUserEmail(users.email);
    });
  }, []);

  //유효성 검사 돔요소 접근
  const titleRef = useRef('');
  const companyRef = useRef('');
  const motiveRef = useRef('');
  const growRef = useRef('');
  const goodBadRef = useRef('');

  // 버튼 클릭시 add
  const addInfo = async (event) => {
    event.preventDefault();

    // 새로운 객체 생성
    const newInfo = {
      email: userEmail,
      date: new Date(),
      title,
      company,
      motive,
      grow,
      goodBad,
      like: 0, // like는 초깃값을 넣어주지 않으면 NAN으로 뜨기 때문에 숫자형 0을 넣어줘야함.
    };

    // 유효성 검사, 빈값으로 저장하려고 할시 alert 창 띄움.
    if (title === '') {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return false;
    } else if (company === '') {
      alert('"본인이 지원하고자 하는 회사" 내용을 입력해주세요.');
      companyRef.current.focus();
      return false;
    } else if (motive === '') {
      alert('"지원하게 된 동기" 내용을 입력해주세요.');
      motiveRef.current.focus();
      return false;
    } else if (grow === '') {
      alert('"자신의 성장과정" 내용을 입력해주세요.');
      growRef.current.focus();
      return false;
    } else if (goodBad === '') {
      alert('"자신의 장단점" 내용을 입력해주세요.');
      goodBadRef.current.focus();
      return false;
    } else {
      setInfos((prev) => {
        return [...infos, newInfo];
      });

      // Firestore에서 'infos' 컬렉션에 대한 참조 생성하기
      const collectionRef = collection(db, 'infos');
      // 'infos' 컬렉션에 newInfos 문서를 추가합니다.
      await addDoc(collectionRef, newInfo);

      alert('게시글 등록이 완료 되었습니다🎉');

      // 렌더링 되면 input value 빈값 만들기
      setCompany('');
      setMotive('');
      setGrow('');
      setGoodBad('');

      // 다시 list 페이지로 이동.
      navigate('/list');
    }
  };

  return (
    <Wrap>
      <InnerBox>
        <WriteBox>
          <label className="applyTitle">
            제목
            <textarea
              placeholder="제목을 입력해주세요!"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              ref={titleRef}
            />
          </label>
          <label>
            본인이 지원하고자 하는 회사란?
            <textarea
              placeholder="자신이 생각한 회사의 이미지를 설명해 어필해보세요!"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              ref={companyRef}
            />
          </label>
          <label>
            지원하게 된 동기?
            <textarea
              placeholder="지원하게 된 동기가 무엇일까요?"
              value={motive}
              onChange={(event) => setMotive(event.target.value)}
              ref={motiveRef}
            />
          </label>
          <label>
            자신의 성장과정?
            <textarea
              placeholder="자신의 성장과정을 입력해주세요!"
              value={grow}
              onChange={(event) => setGrow(event.target.value)}
              ref={growRef}
            />
          </label>
          <label>
            자신의 장단점?
            <textarea
              placeholder="자신이 생각하는 자신의 장점과 단점을 입력해주세요!"
              value={goodBad}
              onChange={(event) => setGoodBad(event.target.value)}
              ref={goodBadRef}
            />
          </label>
          <WriteBtn>
            <button type="submit" onClick={addInfo}>
              저장
            </button>
            <button
              type="button"
              onClick={function () {
                navigate('/list');
              }}
            >
              이전
            </button>
          </WriteBtn>
        </WriteBox>
      </InnerBox>
    </Wrap>
  );
}
export default Write;

// 스타일드 컴포넌트
export const Wrap = styled.div`
  background-color: #366671;
`;

export const InnerBox = styled.div`
  width: 1020px;
  margin: 0px auto;
`;

export const WriteBox = styled.form`
  overflow: hidden;
  padding-top: 50px;

  & .applyTitle {
    display: flex;
    height: 70px;
    padding: 0 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & textarea {
      margin-left: 20px;
      margin-top: 0px;
      height: 20px;
      width: 883px;
      line-height: 20px;
      overflow-y: hidden;
    }
  }

  & label {
    display: flex;
    margin: 30px 0;
    font-size: 24px;
    font-weight: bold;
    height: 185px;
    background-color: #fff;
    padding: 20px;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 3px 3px 5px 0px #00000050;
    width: 971px;
  }
  & textarea {
    margin-top: 20px;
    height: 100%;
    font-size: 16px;
    background-color: transparent;
    border: none;
    resize: none;
    padding: 10px;
  }
`;

//버튼 스타일 부분
export const WriteBtn = styled.div`
  margin-top: 60px;
  text-align: center;
  padding-bottom: 80px;
  & .deleteBtn {
    display: none;
  }
  & .editBtn {
    display: none;
  }
  & .prevBtn {
    display: none;
  }
  & .deleteBtn:hover {
    background-color: #e7b7b7;
  }
  & button {
    display: inline-block;
    width: 160px;
    height: 40px;
    background-color: #d9d9d9;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin: 0 20px;
    box-shadow: 3px 3px 5px 0px #00000050;
  }
  transition: 0.5s;
  & button:hover {
    background-color: #fff;
    transition: 0.3s;
  }
`;
