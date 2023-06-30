import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import ListItem from '../components/ListItem';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from './../images/wirteBtn.svg';

const List = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
    const qusers = query(collection(db, 'users'));
    const qinfos = query(collection(db, 'infos'));

    const querySnapshotUsers = await getDocs(qusers);
    const querySnapshotInfos = await getDocs(qinfos);
    const initialUsers = [];
    const initialInfos = [];
    // document의 id와 데이터를 initialTodos에 저장합니다.
    // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
    // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
    querySnapshotUsers.forEach((doc) => {
      initialUsers.push({ id: doc.id, ...doc.data() });
    });
    querySnapshotInfos.forEach((doc) => {
      initialInfos.push({ id: doc.id, ...doc.data() });
    });
    setLists(initialUsers);
    setUsers(initialInfos);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 이건 밑으로 내려보내면 에러납니다
  // 위에 두는게 좋을거 같네여
  const StListUl = styled.ul`
    display: none;
    text-align: left;
    width: 150px;
    margin-top: 5px;
    background: #fff;
    padding: 10px;
    & li {
      border: 1px solid #000;
      padding: 0.725rem;
      cursor: pointer;
    }
  `;

  // 토글 정렬
  // 중복된 값을 저지하는 함수이벤트입니다.
  const sortItems = ['최신순', '인기순'];
  const [state, setState] = useState('최신순');
  const openRef = useRef('');
  const onSetState = (e) => {
    state === e
      ? (openRef.current.style.display = 'none')
      : setState(e.innetText);
    changeUl.current = 'none';
  };

  // 클릭시 내용의 값이 바뀌는 함수입니다.
  const changeUl = useRef('none');
  const onClickListUl = () => {
    if (changeUl.current === 'none') {
      openRef.current.style.display = 'block';
      changeUl.current = 'block';
    } else {
      openRef.current.style.display = 'none';
      changeUl.current = 'none';
    }
  };

  // user와, info를 합친 객체를 배열로 반환합니다
  const newarr = [];
  users.forEach((user) => {
    lists.map((list) => {
      user.email === list.email ? newarr.push({ ...user, ...list }) : null;
    });
  });

  // 인기순으로 정렬되어있는 함수입니다.
  const popularList = [...newarr].sort((a, b) => b.date - a.date);
  // const popularList = [...newarr].sort((a, b) => {
  //   if (a.like < b.like) return 1;
  //   if (a.like > b.like) return -1;
  //   return 0;
  // });

  // 최신순으로 정렬되어있는 함수입니다.
  // 현재 date값이 객체입니다. 이부분은 보안이 필요합니다.
  const newestList = [...newarr].sort((a, b) => a.date - b.date);

  return (
    <div>
      {/* <WritingForm>히히히</WritingForm> */}
      <StWirteBtn action="#" onSubmit={(e) => e.preventDefault()}>
        {/* <Link to="/write"> */}
        <button onClick={() => navigate('/write')}>
          <img src={img} alt="글쓰기 버튼 이미지" />
        </button>
        {/* </Link> */}
      </StWirteBtn>

      <StListSection>
        <h2>{state}</h2>
        <StSortBox>
          <p onClick={onClickListUl}>{state || '최신순'} ▼</p>
          <StListUl ref={openRef}>
            {/* 최신순 인기순 정렬 입니다. */}
            {sortItems.map((item, index) => {
              return (
                // <li key={item} onClick={() => onSetState(item)}>
                <li
                  key={index}
                  onClick={() => {
                    setState(item);
                    onClickListUl();
                  }}
                >
                  {/* <li key={item} onClick={() => dispatch()}> */}
                  <span>{item}</span>
                </li>
              );
            })}
          </StListUl>
        </StSortBox>

        <StListbox>
          <StListGridBox>
            <ListItem
              lists={state === '최신순' ? newestList : popularList}
              users={users}
            />
          </StListGridBox>
        </StListbox>
      </StListSection>
    </div>
  );
};

const BGCOLORONE = '#6C8383';
const BGCOLORTWO = '#92A29C';
const StListSection = styled.section`
  position: relative;
  width: 1400px;
  margin: 2.5rem auto 0;
  box-sizing: border-box;
  padding: 2.5rem 1.875rem 1.25rem;
  background: ${BGCOLORONE};
  & h2 {
    font-size: 1.4rem;
  }
`;

const StListGridBox = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(3, 1fr); */
`;

const StListPosition = styled.div`
  position: relative;
`;
const StListbox = styled.div`
  background-color: ${BGCOLORTWO};
  padding: 3.125rem 1.25rem 1.25rem;
`;
const StSortBox = styled.div`
  text-align: right;
  position: absolute;
  top: 2rem;
  right: 50px;
  z-index: 20;
  cursor: pointer;
`;
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

export default List;
