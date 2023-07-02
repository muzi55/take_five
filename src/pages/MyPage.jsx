import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { decode, encode } from 'url-safe-base64';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/modules/UserInfo';
import { getUserWrite } from '../redux/modules/UserWrite';
import { getUserPhoto } from '../redux/modules/UserPhoto';
import * as S from '../style/MypageStyled';

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const userWrite = useSelector((state) => state.userWrite);
  const userPhoto = useSelector((state) => state.userPhoto);
  console.log(userInfo);
  useEffect(() => {
    fetchUserData();
    fetchInfoData();
  }, []);

  onAuthStateChanged(auth, (users) => {
    dispatch(getUserPhoto(users.photoURL));
  });

  const fetchUserData = async () => {
    const dbUsers = query(
      collection(db, 'users'),
      where('email', '==', atob(decode(params.email)))
    );

    const usersData = [];

    const userSnapshot = await getDocs(dbUsers);
    userSnapshot.forEach((doc) => {
      usersData.push(doc.data());
    });
    dispatch(getUserInfo(...usersData));
  };

  const fetchInfoData = async () => {
    const dbWrite = query(
      collection(db, 'infos'),
      where('email', '==', atob(decode(params.email)))
    );

    const writeData = [];

    const writeSnapshot = await getDocs(dbWrite);
    writeSnapshot.forEach((doc) => {
      writeData.push({ id: doc.id, ...doc.data() });
    });
    dispatch(getUserWrite([...writeData]));
  };

  const logout = async (event) => {
    if (confirm('로그아웃 하시겠습니까?')) {
      event.preventDefault();
      await signOut(auth);
      navigate('/');
    }
  };

  const deleteWrite = async (id) => {
    if (confirm('삭제 하시겠습니까?')) {
      const writeRef = doc(db, 'infos', id);
      await deleteDoc(writeRef);
      fetchInfoData();
    }
  };

  return (
    <S.Layout>
      <S.Nav>
        <S.NavImgBtn onClick={() => navigate(`/list`)}>
          뉴스 피드 가기
        </S.NavImgBtn>
        <S.NavBtn onClick={logout}>log out</S.NavBtn>
        <S.NavImgBtn
          onClick={() => navigate(`/mypage/${encode(btoa(userInfo.email))}`)}
        >
          <S.NavImg src={userInfo.imgFile ?? '/user.png'} alt="" />
        </S.NavImgBtn>
      </S.Nav>
      <S.Container>
        <S.ProfileImg>
          <S.EditBtn
            onClick={() =>
              navigate(`/editprofile/${encode(btoa(userInfo.email))}`)
            }
          >
            <img src="" alt="" />
          </S.EditBtn>
          <S.Img src={userInfo.imgFile ?? '/user.png'} alt="" />
          <S.Profile>프로필</S.Profile>
        </S.ProfileImg>
        <S.NickNameBox>
          {userInfo.nickName}
          <br />
          나의 게시물 수 : {userWrite.length} / 게시물 좋아요 수 : ♥{' '}
          {userWrite.map((obj) => Number(obj.like)).reduce((a, b) => a + b, 0)}
        </S.NickNameBox>
        <S.IntroBox>
          <div>소개글</div>
          <div>{userInfo.introduce}</div>
        </S.IntroBox>
        <S.WriteList>
          나의 게시물
          {userWrite.map((obj) => {
            return (
              <S.StList key={obj.id}>
                <S.ListTitle>
                  {obj.email}
                  <S.ListBtn>♥</S.ListBtn>
                </S.ListTitle>
                <S.ListBtnBox>
                  <S.ListBtn onClick={() => navigate(`/editdetail/${obj.id}`)}>
                    수정
                  </S.ListBtn>
                  <S.ListBtn onClick={() => deleteWrite(obj.id)}>
                    삭제
                  </S.ListBtn>
                </S.ListBtnBox>
              </S.StList>
            );
          })}
        </S.WriteList>
      </S.Container>
    </S.Layout>
  );
}

export default MyPage;
