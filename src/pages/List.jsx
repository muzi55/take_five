import React, { useEffect, useRef, useState } from 'react';
//
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import ListItem from './ListItem';
import WritingForm from './WritingForm';
//
import styled from 'styled-components';

const List = () => {
  const [users, setUsers] = useState([]);
  const [infos, setInfos] = useState([]);

  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const dbUsers = query(collection(db, 'users'));
      const dbInfos = query(collection(db, 'infos'));

      const querySnapshotUsers = await getDocs(dbUsers);
      const querySnapshotInfos = await getDocs(dbInfos);

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

      setUsers(initialUsers);
      setInfos(initialInfos);
    };

    fetchData();
  }, []);

  const openRef = useRef('');
  const StListUl = styled.ul`
    background: #fff;
    padding: 10px;
    & li {
      border: 1px solid #000;
      padding: 10px;
      cursor: pointer;
    }
  `;
  return (
    <div>
      <>
        {/* {lists.map((e) => {
          return (
            <div key={e.id}>
              {e.text}
              <img src={e.img} alt="" />
            </div>
          );
        })} */}
      </>
      <div>
        <WritingForm />

        <StListSection>
          <h2>최신순</h2>
          <StSortBox ref={openRef}>
            <p>최신순 ▼</p>
            <div>
              <StListUl>
                <li>123</li>
                <li>123</li>
                <li>123</li>
              </StListUl>
            </div>
          </StSortBox>

          <StListbox>
            <StListGridBox>
              {/* <li></li> */}

              <ListItem infos={infos} users={users} />
            </StListGridBox>
          </StListbox>
        </StListSection>
      </div>
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
  position: absolute;
  top: 1.25rem;
  right: 50px;
`;

export default List;
