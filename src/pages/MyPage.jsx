import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { decode } from "url-safe-base64";

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
      const dbUsers = await getDocs(collection(db, "users"));
      const dbWrite = await getDocs(collection(db, "infos"));
      const usersData = [];
      const writeData = [];

      dbUsers.forEach((doc) => {
        const usersId = doc.data().email;
        if (usersId === atob(decode(params.id))) usersData.push(doc.data());
      });
      setItem(...usersData);

      dbWrite.forEach((doc) => {
        const writeId = doc.data().email;
        if (writeId === atob(decode(params.id))) writeData.push(doc.data());
      });
      setWrite([...writeData]);
    };
    fetchData();
  }, []);

  const logout = () => {};

  return (
    <Layout>
      <Nav>
        <NavBtn onClick={logout}>log out</NavBtn>
        <NavImgBtn onClick={() => navigate("/mypage/:id")}>
          <NavImg src={user.photoURL ?? "/nullImg.png"} alt="" />
        </NavImgBtn>
      </Nav>
      <Container>
        <ProfileImg>
          <EditBtn onClick={() => navigate("/edit/:id")}>
            <img src="" alt="" />
          </EditBtn>
          <Img src={user.photoURL ?? "/nullImg.png"} alt="" />
          <Profile>프로필</Profile>
        </ProfileImg>
        <NickNameBox>
          {item.nickname}
          <br />
          나의 게시물 수 : {write.length} / 게시물 좋아요 수 : ♥ {}
        </NickNameBox>
        <IntroBox>
          <div>소개글</div>
          <div>{item.introduce}</div>
        </IntroBox>
        <WriteList>
          나의 게시물
          <StList>
            <ListTitle>
              아무튼 그냥 테스트용 긴 텍스트
              <ListBtn>♥</ListBtn>
            </ListTitle>
            <ListBtnBox>
              <ListBtn onClick={() => navigate("/")}>수정</ListBtn>
              <ListBtn>삭제</ListBtn>
            </ListBtnBox>
          </StList>
          <StList>
            <ListTitle>
              text
              <ListBtn>♥</ListBtn>
            </ListTitle>
            <ListBtnBox>
              <ListBtn onClick={() => navigate("/")}>수정</ListBtn>
              <ListBtn>삭제</ListBtn>
            </ListBtnBox>
          </StList>
          <StList>
            <ListTitle>
              text
              <ListBtn>♥</ListBtn>
            </ListTitle>
            <ListBtnBox>
              <ListBtn onClick={() => navigate("/")}>수정</ListBtn>
              <ListBtn>삭제</ListBtn>
            </ListBtnBox>
          </StList>
          <StList>
            <ListTitle>
              text
              <ListBtn>♥</ListBtn>
            </ListTitle>
            <ListBtnBox>
              <ListBtn onClick={() => navigate("/")}>수정</ListBtn>
              <ListBtn>삭제</ListBtn>
            </ListBtnBox>
          </StList>
        </WriteList>
      </Container>
    </Layout>
  );
}

//화면 레이아웃
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

//nav바
const Nav = styled.div`
  position: relative;
  top: 0px;
  height: 50px;
  width: 100vw;
  background-color: #dfe0dc;
`;

const NavImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const NavImgBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  float: right;
  margin: 5px;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const NavBtn = styled.button`
  width: 100px;
  height: 40px;
  margin: 5px;
  float: right;
  border: none;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
`;

//내부 item 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  gap: 20px;
`;
// 프로필 이미지, 수정 버튼, 프로필 텍스트
const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border: 6px solid #dfe0dc;
  border-radius: 50%;
`;

const EditBtn = styled.button`
  position: relative;
  left: 72px;
  top: 40px;
  width: 40px;
  height: 40px;
  background-color: #dfe0dc;
  border: 5px solid #dfe0dc;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const Profile = styled.div`
  margin-top: 20px;
  text-align: center;
`;
// 닉네임, global like, 자신이 쓴 글 갯수
const NickNameBox = styled.div`
  width: 440px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  background-color: #dfe0dc;
`;
//소개 글
const IntroBox = styled.div`
  width: 750px;
  text-align: start;
  line-height: 30px;
  padding: 10px;
  background-color: #dfe0dc;
`;
//게시물 LIST
const WriteList = styled.ul`
  width: 750px;
  padding: 10px;
  background-color: #dfe0dc;
`;

const StList = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
`;

const ListTitle = styled.div`
  display: flex;
  width: 80%;
  text-align: start;
  justify-content: space-between;
  align-items: center;
  background-color: #6c8383;
  padding-left: 10px;
`;

const ListBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ListBtn = styled.button`
  border: none;
  width: 50px;
  height: 30px;
  background-color: #6c8383;
  &:hover {
    cursor: pointer;
  }
`;

export default MyPage;
