import React, { useEffect, useRef, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { InnerBox, WriteBtn } from './Write';
import { MyInfo, WriteBox } from '../style/DetailStyled';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Detail() {
  const navigate = useNavigate();
  const param = useParams();
  const paramEmail = param.email.split('&')[0];
  const paramId = param.email.split('&')[1];

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
        if (info.email === paramEmail) {
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
  const deleteInfo = async () => {
    if (confirm('삭제하시겠습니까?')) {
      const todoRef = doc(db, 'infos', userInfo.id);
      await deleteDoc(todoRef);
      navigate('/list');
    }
  };

  const { company, goodBad, grow, introduce, like, motive, name, spec } =
    userInfo;

  // 리덕스 사용
  const dispetch = useDispatch();
  const editDetail = () => {
    dispetch({
      type: 'EDIT_DETAIL',
      payload: userInfo,
    });
  };

  return (
    <InnerBox>
      {/* my page 내용 */}
      <MyInfo>
        <img
          src="https://velog.velcdn.com/images/seul-bean/profile/259fe091-ca51-424b-bf1a-aca4da376a9c/social_profile.png"
          alt="프로필 사진"
        />
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
