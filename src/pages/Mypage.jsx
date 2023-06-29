import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { decode, encode } from 'url-safe-base64';
import * as S from '../style/MypageStyled';

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState([]);
  const [write, setWrite] = useState([]);
  const user = auth.currentUser;
  //로컬, 세션 스토리지를 이용한 새로고침 대응

  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      console.log(users);
    });

    const fetchData = async () => {
      const dbUsers = await getDocs(collection(db, 'users'));
      const dbWrite = await getDocs(collection(db, 'infos'));
      const usersData = [];
      const writeData = [];

      dbUsers.forEach((doc) => {
        const usersId = doc.data().email;
        if (usersId === atob(decode(params.email))) usersData.push(doc.data());
      });
      setItem(...usersData);

      dbWrite.forEach((doc) => {
        const writeId = doc.data().email;
        if (writeId === atob(decode(params.email))) writeData.push(doc.data());
      });
      setWrite([...writeData]);
    };
    fetchData();
  }, []);

  const logout = () => {};
  return (
    <S.Layout>
      <S.Nav>
        <S.NavBtn onClick={logout}>log out</S.NavBtn>
        <S.NavImgBtn
          onClick={() => navigate(`/mypage/${encode(btoa(user.email))}`)}
        >
          {/* <S.NavImg src={user.photoURL ?? '/user.png'} alt="" /> */}
          <S.NavImg src="/user.png" alt="" />
        </S.NavImgBtn>
      </S.Nav>
      <S.Container>
        <S.ProfileImg>
          <S.EditBtn
            onClick={() => navigate(`/editprofile/${encode(btoa(user.email))}`)}
          >
            <img src="" alt="" />
          </S.EditBtn>
          {/* <S.Img src={user.photoURL ?? '/user.png'} alt="" /> */}
          <S.Img src="/user.png" alt="" />
          <S.Profile>프로필</S.Profile>
        </S.ProfileImg>
        <S.NickNameBox>
          {item.nickname}
          <br />
          나의 게시물 수 : {write.length} / 게시물 좋아요 수 : ♥ {}
        </S.NickNameBox>
        <S.IntroBox>
          <div>소개글</div>
          <div>{item.introduce}</div>
        </S.IntroBox>
        <S.WriteList>
          나의 게시물
          <S.StList>
            <S.ListTitle>
              아무튼 그냥 테스트용 긴 텍스트
              <S.ListBtn>♥</S.ListBtn>
            </S.ListTitle>
            <S.ListBtnBox>
              <S.ListBtn onClick={() => navigate('/')}>수정</S.ListBtn>
              <S.ListBtn>삭제</S.ListBtn>
            </S.ListBtnBox>
          </S.StList>
          <S.StList>
            <S.ListTitle>
              text
              <S.ListBtn>♥</S.ListBtn>
            </S.ListTitle>
            <S.ListBtnBox>
              <S.ListBtn onClick={() => navigate('/')}>수정</S.ListBtn>
              <S.ListBtn>삭제</S.ListBtn>
            </S.ListBtnBox>
          </S.StList>
          <S.StList>
            <S.ListTitle>
              text
              <S.ListBtn>♥</S.ListBtn>
            </S.ListTitle>
            <S.ListBtnBox>
              <S.ListBtn onClick={() => navigate('/')}>수정</S.ListBtn>
              <S.ListBtn>삭제</S.ListBtn>
            </S.ListBtnBox>
          </S.StList>
          <S.StList>
            <S.ListTitle>
              text
              <S.ListBtn>♥</S.ListBtn>
            </S.ListTitle>
            <S.ListBtnBox>
              <S.ListBtn onClick={() => navigate('/')}>수정</S.ListBtn>
              <S.ListBtn>삭제</S.ListBtn>
            </S.ListBtnBox>
          </S.StList>
        </S.WriteList>
      </S.Container>
    </S.Layout>
  );
}

export default MyPage;
