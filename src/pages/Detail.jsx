import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { InnerBox, WriteBtn } from './Write';
import { MyInfo, WriteBox } from '../style/DetailStyled';
import { useNavigate, useParams } from 'react-router-dom';
import LikeImg from '../images/Like.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPhoto } from '../redux/modules/UserPhoto';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';

function Detail() {
  const navigate = useNavigate();
  const param = useParams();
  const paramEmail = param.email.split('&')[0];
  const paramId = param.email.split('&')[1];
  const userPhoto = useSelector((state) => state.userPhoto);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (users) => {
    dispatch(getUserPhoto(users.photoURL));
  });

  const deleteIdRef = useRef('');
  const editIdRef = useRef('');

  const [userInfo, setUserInfo] = useState({});

  // firestore에서 infos, users 데이터 읽기

  useEffect(() => {
    const fetchData = async () => {
      const dbInfos = query(collection(db, 'infos'));
      const dbUsers = query(collection(db, 'users'));

      const querySnapshotInfo = await getDocs(dbInfos);
      const querySnapshotUser = await getDocs(dbUsers);

      const initialInfos = [];
      const initialUsers = [];

      querySnapshotInfo.forEach((doc) => {
        initialInfos.push({ id: doc.id, ...doc.data() });
      });
      querySnapshotUser.forEach((doc) => {
        initialUsers.push({ id: doc.id, ...doc.data() });
      });

      const filterInfo = initialInfos.filter((info) => {
        if (info.email === paramEmail && info.id === paramId) {
          return info;
        }
      });
      initialUsers.filter((user) => {
        if (user.email === paramEmail) {
          setUserInfo({ ...user, ...filterInfo[0] });
        }
      });

      const userEmail = auth.currentUser.email;
      if (userEmail !== paramEmail) {
        deleteIdRef.current.style.display = 'none';
        editIdRef.current.style.display = 'none';
      } else {
        deleteIdRef.current.style.display = 'inline-block';
        editIdRef.current.style.display = 'inline-block';
      }
    };
    fetchData();
  }, []);

  // firestore 데이터 삭제 부분
  const {
    company,
    goodBad,
    grow,
    motive,
    like,

    introduce,
    name,
    spec,
  } = userInfo;

  const deleteInfo = async (event) => {
    if (confirm('삭제하시겠습니까?')) {
      const todoRef = doc(db, 'infos', like);
      await deleteDoc(todoRef);
      navigate('/list');
    }
  };

  // 리덕스 사용
  const dispetch = useDispatch();
  const editDetail = () => {
    dispetch({
      type: 'EDIT_DETAIL',
      payload: userInfo,
    });
  };
  // 업데이트 부분
  const [render, setRender] = useState(like);
  const updateInfo = async (event) => {
    const infoRef = doc(db, 'infos', info.id);
    // 기존값, {...info, 변경해야할키 : 변경해야하는값}
    await updateDoc(infoRef, { ...info, like: Number(like) + 1 }); // 업데이트할 필드 명시

    setRender((render) => render + 1);
  };

  return (
    <InnerBox>
      {/* my page 내용 */}
      <MyInfo>
        {/* 추가부분 라이크 박스 */}
        <StLikeSpan>
          <img onClick={updateInfo} src={LikeImg} alt="하트모양 이미지" /> :
          {render}
          {like}
        </StLikeSpan>
        <img src={userPhoto ?? '/user.png'} alt="프로필 사진" />
        <div className="myInfo_text">
          <dl>
            <dt>Name</dt>
            <dd>{name}</dd>
          </dl>
          <dl>
            <dt>spec</dt>
            <dd>{spec}</dd>
          </dl>
          <dl>
            <dt>Introduce</dt>
            <dd>{introduce}</dd>
          </dl>
        </div>
      </MyInfo>

      {/* write 내용 */}
      <WriteBox>
        <dl>
          <dt>본인이 지원하고자 하는 회사란?</dt>
          <dd>{company}</dd>
        </dl>
        <dl>
          <dt>지원하게 된 동기?</dt>
          <dd>{motive}</dd>
        </dl>
        <dl>
          <dt>자신의 성장과정</dt>
          <dd>{grow}</dd>
        </dl>
        <dl>
          <dt>자신의 장단점</dt>
          <dd>{goodBad}</dd>
        </dl>
      </WriteBox>

      {/* 수정, 삭제 버튼 */}
      <WriteBtn>
        <button
          onClick={() => {
            editDetail();
            navigate(`/editdetail/${userInfo.id}`);
          }}
          ref={editIdRef}
        >
          수정
        </button>
        <button onClick={deleteInfo} ref={deleteIdRef}>
          삭제
        </button>
        <button
          onClick={() => {
            navigate('/list');
          }}
        >
          이전페이지
        </button>
      </WriteBtn>
    </InnerBox>
  );
}

export default Detail;

const StLikeSpan = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  top: 2.5rem;
  right: 4rem;
  font-size: 1.4rem;
  & img {
    background: none;
    transition: all 8s;
    cursor: pointer;
    &:active {
      transform: rotateY(18560deg);
      background: magenta;
    }
  }
`;
