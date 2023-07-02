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
import * as S from '../style/MypageStyled';
import img from './../images/wirteBtn.svg';

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const userWrite = useSelector((state) => state.userWrite);

  useEffect(() => {
    fetchUserData();
    fetchInfoData();
  }, []);

  onAuthStateChanged(auth, (users) => {});

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
        <S.NavBtn onClick={logout}>Log out</S.NavBtn>
        <S.NavBtn onClick={() => navigate(`/list`)}>Back to List</S.NavBtn>
      </S.Nav>
      <S.GridMain>
        <S.ProfileSidebar>
          <S.SidebarText>PROFILE</S.SidebarText>
          <S.SidebarSubText>Let everyone know who you are</S.SidebarSubText>
        </S.ProfileSidebar>
        <S.Container>
          <S.ProfileImg>
            <S.EditBtn
              onClick={() =>
                navigate(`/editprofile/${encode(btoa(userInfo.email))}`)
              }
            >
              <img src={img} alt="" />
            </S.EditBtn>
            <S.Img src={userInfo.imgFile ?? '/user.png'} alt="" />
            <S.Profile>프로필</S.Profile>
          </S.ProfileImg>
          <S.NickNameBox>
            {userInfo.nickName}
            <br />
            나의 게시물 수 : {userWrite.length} / 게시물 좋아요 수 : ♥{' '}
            {userWrite
              .map((obj) => Number(obj.like))
              .reduce((a, b) => a + b, 0)}
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
                  <S.ListTitle
                    to={`/detail/${encode(btoa(obj.email))}&${obj.id}`}
                  >
                    {/* 여기 바꿔야함 */}
                    {obj.id}
                  </S.ListTitle>
                  <S.ListBtnBox>
                    <S.ListLike>♥ {obj.like}</S.ListLike>
                    <S.ListBtn onClick={() => deleteWrite(obj.id)}>
                      삭제
                    </S.ListBtn>
                  </S.ListBtnBox>
                </S.StList>
              );
            })}
          </S.WriteList>
        </S.Container>
      </S.GridMain>
    </S.Layout>
  );
}

export default MyPage;
