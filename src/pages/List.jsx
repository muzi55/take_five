//
//  react hook 을 사용한 최적화
//
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
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

  const fetchData = useCallback(async () => {
    const qusers = query(collection(db, 'users'));
    const qinfos = query(collection(db, 'infos'));

    const querySnapshotUsers = await getDocs(qusers);
    const querySnapshotInfos = await getDocs(qinfos);
    const initialUsers = querySnapshotUsers.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const initialInfos = querySnapshotInfos.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLists(initialUsers);
    setUsers(initialInfos);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const StListUl = styled.ul`
    display: none;
    text-align: left;
    margin-top: 12px;
    background: #fff;
    border: 1px solid #000;
    & li {
      text-align: center;
      cursor: pointer;
      & span {
        display: inline-block;
        padding: 10px 15px;
        border-bottom: 1px solid #000;
      }
      &:last-child span {
        border-bottom: none;
        padding-bottom: 20px;
      }
    }
  `;

  const sortItems = useMemo(() => ['최신순', '인기순'], []);
  const [state, setState] = useState('최신순');
  const openRef = useRef('');
  const changeUl = useRef('none');
  const onClickListUl = useCallback(() => {
    if (changeUl.current === 'none') {
      openRef.current.style.display = 'block';
      changeUl.current = 'block';
    } else {
      openRef.current.style.display = 'none';
      changeUl.current = 'none';
    }
  }, []);

  const mergeUserAndList = useMemo(() => {
    return users.reduce((mergedList, user) => {
      const matchedList = lists.find((list) => list.email === user.email);
      if (matchedList) {
        mergedList.push({ ...matchedList, ...user });
      }
      return mergedList;
    }, []);
  }, [users, lists]);

  const popularList = useMemo(
    () => [...mergeUserAndList].sort((a, b) => a.date - b.date),
    [mergeUserAndList]
  );
  const newestList = useMemo(
    () => [...mergeUserAndList].sort((a, b) => b.date - a.date),
    [mergeUserAndList]
  );

  return (
    <div className="bgc">
      <StWirteBtn action="#" onSubmit={(e) => e.preventDefault()}>
        <button onClick={() => navigate('/write')}>
          <img src={img} alt="글쓰기 버튼 이미지" />
        </button>
        <StSortBox>
          <p onClick={onClickListUl}>{state || '최신순'} ▼</p>
          <StListUl ref={openRef}>
            {sortItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setState(item);
                  onClickListUl();
                }}
              >
                <span>{item}</span>
              </li>
            ))}
          </StListUl>
        </StSortBox>
      </StWirteBtn>

      <StListSection>
        <h2>{state}</h2>
        <StListbox>
          <StListGridBox>
            <ListItem lists={state === '최신순' ? newestList : popularList} />
          </StListGridBox>
        </StListbox>
      </StListSection>
    </div>
  );
};

export default React.memo(List);

const BGCOLORONE = '#6C8383';
const BGCOLORTWO = '#92A29C';
const StListSection = styled.section`
  position: relative;
  margin: 2.5rem auto 0;
  box-sizing: border-box;
  width: 1086px;
  & h2 {
    position: absolute;
    top: -9999px;
    left: -9999px;
    text-indent: -9999px;
    font-size: 1.4rem;
  }
`;
const StListGridBox = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const StListbox = styled.div``;
const StSortBox = styled.div`
  text-align: right;
  position: absolute;
  width: 110px;
  top: 175px;
  right: 0;
  z-index: 20;
  cursor: pointer;
  & p {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
`;
const btnColor = '#fff';
const btnWidth = '3.5rem';
const transitionWidth = '13.4375rem';
const StWirteBtn = styled.form`
  height: 13.125rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1086px;
  margin: 0 auto;
  border-bottom: 1px solid #000;

  & button {
    width: ${btnWidth};
    height: ${btnWidth};
    background-color: ${btnColor};
    border-radius: ${btnWidth};
    border: 1px solid #000 !important;
    border: none;
    transition: all 0.3s;
    &:hover {
      width: ${transitionWidth};
    }
  }
`;
