import React, { useRef, useState } from 'react';
import { InnerBox, WriteBox, WriteBtn } from './Write';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';

function EditDetail() {
  const userInfo = useSelector((state) => state.editDetail);
  const { company, goodBad, grow, motive, date, email, id } = userInfo;

  // input value
  const navigate = useNavigate();
  const [editCompany, setCompany] = useState(company);
  const [editMotive, setMotive] = useState(motive);
  const [editGrow, setGrow] = useState(grow);
  const [editGoodBad, setGoodBad] = useState(goodBad);

  //유효성 검사 돔요소 접근
  const companyRef = useRef('');
  const motiveRef = useRef('');
  const growRef = useRef('');
  const goodBadRef = useRef('');

  const newInfo = {
    email,
    date,
    company: editCompany,
    motive: editMotive,
    grow: editGrow,
    goodBad: editGoodBad,
  };

  // 버튼 클릭시 edit
  const editInfo = async (event) => {
    event.preventDefault();

    // 유효성 검사
    if (company === '') {
      alert('"본인이 지원하고자 하는 회사" 내용을 입력해주세요.');
      companyRef.current.focus();
      return false;
    } else if (motive === '') {
      alert('"지원하게 된 동기" 내용을 입력해주세요.');
      motiveRef.current.focus();
      return false;
    } else if (grow === '') {
      alert('"자신의 성장과정" 내용을 입력해주세요.');
      growRef.current.focus();
      return false;
    } else if (goodBad === '') {
      alert('"자신의 장단점" 내용을 입력해주세요.');
      goodBadRef.current.focus();
      return false;
    } else {
      // firestore infos 데이터 수정
      if (confirm('수정하시겠습니까?')) {
        const infoRef = doc(db, 'infos', userInfo.id);
        console.log(infoRef);
        await updateDoc(infoRef, newInfo);

        //다시 해당 detail 페이지로 이동
        navigate(`/detail/${email}&${id}`);
      }
    }
  };

  return (
    <InnerBox>
      <WriteBox>
        <label className="applyCompany">
          본인이 지원하고자 하는 회사란?
          <textarea
            placeholder="자신이 생각한 회사의 이미지를 설명해 어필해보세요!"
            value={editCompany}
            onChange={(event) => setCompany(event.target.value)}
            ref={companyRef}
          />
        </label>
        <label>
          지원하게 된 동기?
          <textarea
            placeholder="지원하게 된 동기가 무엇일까요?"
            value={editMotive}
            onChange={(event) => setMotive(event.target.value)}
            ref={motiveRef}
          />
        </label>
        <label>
          자신의 성장과정?
          <textarea
            placeholder="자신의 성장과정을 입력해주세요!"
            value={editGrow}
            onChange={(event) => setGrow(event.target.value)}
            ref={growRef}
          />
        </label>
        <label>
          자신의 장단점?
          <textarea
            placeholder="자신이 생각하는 자신의 장점과 단점을 입력해주세요!"
            value={editGoodBad}
            onChange={(event) => setGoodBad(event.target.value)}
            ref={goodBadRef}
          />
        </label>
      </WriteBox>
      <WriteBtn>
        {/* navigate(-1)로 이전페이지 구현하고 싶었으나 오류나서 일단 해당 detail 페이지로 이동 */}
        <button onClick={() => navigate(-1)}>이전</button>
        {/* <button onClick={() => navigate(`/detail/${email}&${id}`)}>
            이전
          </button> */}
        <button onClick={editInfo}>저장</button>
      </WriteBtn>
    </InnerBox>
  );
}

export default EditDetail;
