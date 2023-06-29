//components/TodoItem.js
import React from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const ListItem = ({ infos, users }) => {
  //
  //  여기서 부터
  //
  // console.log(todo);
  // const updateTodo = async (event) => {
  //   const todoRef = doc(db, 'lists', todo.id);
  //   await updateDoc(todoRef, { ...todo, isDone: !todo.isDone });

  //   setLists((prev) => {
  //     return prev.map((element) => {
  //       if (element.id === todo.id) {
  //         return { ...element, isDone: !element.isDone };
  //       } else {
  //         return element;
  //       }
  //     });
  //   });
  // };
  // const deleteTodo = async (event) => {
  //   const todoRef = doc(db, 'lists', todo.id);
  //   await deleteDoc(todoRef);

  //   setLists((prev) => {
  //     return prev.filter((element) => element.id !== todo.id);
  //   });
  // };
  //
  //  여기 까지
  //
  console.log(users);
  console.log(infos);
  const StListItem = styled.li`
    width: 19.375rem;
    box-sizing: border-box;
    padding: 38px 28px;
  `;
  const StHeading3 = styled.h3`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  return (
    <>
      {users.map((list) => {
        const { id, email, img, nickname, company, introduce, hash, date } =
          list;
        // id 말고, 다른 대체수단이 필요할 듯 싶다. 글을 쓸 시 => 새롭게 받아오는 글 고유의 id
        // date값을 받아와서, 정렬할 수 있는 수단이 필요할 거 같다.

        return (
          <StListItem key={id}>
            <Link className="link" to={`/detail/${email}$${date}`}>
              <StListImgBox className="list-img-box">
                <img src={img} alt="프로필 사진입니다" />
              </StListImgBox>
              <StListTextBox className="list-text-box">
                <StHeading3>{nickname}</StHeading3>
                <StListTextP>{company}</StListTextP>
                <StListTextP opacity="0.8">{introduce}</StListTextP>
                <StListTextP opacity="0.7" className="list-text-hash">
                  {hash}
                </StListTextP>
              </StListTextBox>
            </Link>
          </StListItem>
        );
      })}
      {/* <li className='list-item"'>
        <div className="list-img-box">
          <img src="#" alt="#" />
        </div>
        <div className="list-text-box">
          <h3>이름</h3>
          <p>지원하는 회사 명</p>
          <p>자기소개</p>
          <p className="list-text-hash">Hash#</p>
        </div>
      </li> */}
    </>
    // <>
    //   <>안녕안녕!</>
    //   {/* <div key={todo.id}> */}
    //   {/* <span>{todo.text}</span> */}
    //   <p>{/* <img src={todo.img} /> */}</p>
    //   {/* <button onClick={updateTodo}>{todo.isDone ? '취소' : '완료'}</button> */}
    //   {/* <button onClick={deleteTodo}>삭제</button> */}
    //   {/* </div> */}
    // </>
  );
};
export default ListItem;

const StListImgBox = styled.div`
  /* width: 18.75rem; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 6rem;
  margin-bottom: 10px;
  & > img {
    display: block;
    width: 6rem;
    border-radius: 6rem;
  }
`;
const StListTextBox = styled.div`
  /* width: 18.75rem; */
  & p {
    font-size: 1rem;
  }
`;
const StListTextP = styled.p`
  opacity: ${(props) => props.opacity || '1'};
  margin-top: 10px;
  &:last-child {
    margin-top: 34px;
  }
`;
