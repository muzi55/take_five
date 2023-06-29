import React, { useEffect, useRef, useState } from 'react';
//
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../firebase/firebase';
import ListItem from './ListItem';
import WritingForm from './WritingForm';
//
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const List = () => {
  const [lists, setLists] = useState([]);
  const [users, setUsers] = useState([]);

  // 리덕스
  const listSelector = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  // 파이어베이스
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const qusers = query(collection(db, 'users'));
      const qinfos = query(collection(db, 'infos'));
      // const q = query(collection(db, 'users'));
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
    fetchData();
  }, []);

  const openRef = useRef('');

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
  // 유저 이메일로 필터

  // 토글 정렬창
  const sortItems = ['최신순', '인기순'];

  const [state, setState] = useState(sortItems[0]);
  // 중복된 값을 저지하는 함수이벤트입니다.
  const onSetState = (e) => {
    state === e ? (openRef.current.style.display = 'none') : setState(e);
    changeUl.current = 'none';
  };

  // toggle 정렬입니다.
  const changeUl = useRef('none');
  const onClickListUl = () => {
    // 여기서 redux 추가되야합니다.
    if (changeUl.current === 'none') {
      openRef.current.style.display = 'block';
      changeUl.current = 'block';
    } else {
      openRef.current.style.display = 'none';
      changeUl.current = 'none';
    }
  };

  // 1

  // user와, info를 합친 객체를 배열로 반환합니다
  const newarr = [];
  users.forEach((user) => {
    lists.map((list) => {
      user.email === list.email ? newarr.push({ ...user, ...list }) : null;
    });
  });
  console.log(newarr);

  // 인기순으로 정렬되어있는 함수입니다.
  const popularList = [...newarr].sort((a, b) => {
    if (a.like > b.like) return 1;
    if (a.like < b.like) return -1;
    return 0;
  });

  // 최신순으로 정렬되어있는 함수입니다.
  // like => date 로 값을 바꿔줘야합니다.
  const newestList = [...newarr].sort((a, b) => a.date - b.date);

  console.log(popularList, newestList);
  return (
    <div>
      <WritingForm />

      <StListSection>
        <h2>{state}</h2>
        <StSortBox>
          <p onClick={onClickListUl}>{state || '최신순'} ▼</p>
          <StListUl ref={openRef}>
            {/* 최신순 인기순 정렬 입니다. */}
            {sortItems.map((item) => {
              return (
                <li key={item} onClick={() => onSetState(item)}>
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

export default List;
