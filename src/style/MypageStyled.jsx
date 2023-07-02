import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

//화면 레이아웃
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

//nav바
export const Nav = styled.div`
  position: relative;
  top: 0px;
  height: 50px;
  width: 98vw;
  border-bottom: 2px solid #fff;
`;

export const NavImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const NavImgBtn = styled.button`
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

export const NavBtn = styled.button`
  width: 100px;
  height: 40px;
  margin: 5px;
  float: right;
  border: none;
  border-radius: 15px;
  color: #fff;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;
//Main 컨테이너
export const GridMain = styled.main`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 98vw;
`;

//사이드바
export const ProfileSidebar = styled.div`
  border-right: 2px solid #fff;
  margin-top: 40px;
  padding-right: 20px;
`;

export const SidebarText = styled.div`
  font-weight: 600;
  font-size: 100px;
  color: #fff;
`;

export const SidebarSubText = styled.div`
  letter-spacing: 5px;
  margin-left: 6px;
  color: #fff;
`;

//내부 item 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  gap: 20px;
`;
// 프로필 이미지, 수정 버튼, 프로필 텍스트
export const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  border: 6px solid #fff;
  border-radius: 50%;
`;

export const EditBtn = styled.button`
  position: relative;
  left: 72px;
  top: 40px;
  width: 40px;
  height: 40px;
  border: 5px solid #fff;
  background-color: #fff;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export const Profile = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #fff;
`;
// 닉네임, global like, 자신이 쓴 글 갯수
export const NickNameBox = styled.div`
  width: 750px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  color: #fff;
`;
//소개 글
export const IntroBox = styled.div`
  width: 750px;
  text-align: start;
  line-height: 30px;
  padding: 10px 10px 30px 10px;
  border-bottom: 1px solid #fff;
  color: #fff;
`;
//게시물 LIST
export const WriteList = styled.ul`
  width: 750px;
  padding: 10px 10px 30px 10px;
  border-bottom: 1px solid #fff;
  color: #fff;
`;

export const StList = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
`;

export const ListTitle = styled(Link)`
  display: flex;
  text-align: start;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  color: #fff;
  &:link {
    color: inherit;
  }
`;

export const ListBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const ListLike = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 50px;
  height: 30px;
`;
export const ListBtn = styled.button`
  border: none;
  width: 50px;
  height: 30px;
  background-color: transparent;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;
