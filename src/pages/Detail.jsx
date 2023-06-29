import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { InnerBox } from './Write';
import { MyInfo, WriteBox } from '../style/DetailStyled';

import { useParams } from 'react-router-dom';

function Detail() {
  const param = useParams();
  const paramEmail = param.email.split('&')[0];
  const paramId = param.email.split('&')[1];

  const [userInfo, setUserInfo] = useState({});
  // 데이터 읽기 -----------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const dbInfos = query(collection(db, 'infos'));
      const dbUsers = query(collection(db, 'users'));

      const querySnapshotInfo = await getDocs(dbInfos);
      const querySnapshotUser = await getDocs(dbUsers);

      const initialInfos = [];
      const initialUsers = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshotInfo.forEach((doc) => {
        initialInfos.push({ id: doc.id, ...doc.data() });
      });
      querySnapshotUser.forEach((doc) => {
        initialUsers.push({ id: doc.id, ...doc.data() });
      });

      // console.log(initialInfos);
      console.log(initialUsers);

      const filterInfo = initialInfos.filter((info) => {
        if (info.email === paramEmail) {
          return info;
        }
      });

      initialUsers.filter((user) => {
        if (user.email === paramEmail) {
          setUserInfo({ ...user, ...filterInfo[0] });
        }
      });
    };
    fetchData();
  }, []);

  // bucket이라는 변수로 firestore의 collection인 bucket에 접근
  //   useEffect(() => {
  //   const bucket = firestore.collection("infos");

  //   // bucket 콜렉션의 bucket_item 문서 삭제
  //   bucket.doc(userInfo.id).delete();
  // })
  // console.log(userInfo.id);
  const deleteInfo = async (event) => {
    if (confirm('삭제하시겠습니까?')) {
      const todoRef = doc(db, 'infos', userInfo.id);
      await deleteDoc(todoRef);
    }
  };

  const { company, goodBad, grow, introduce, like, motive, name, skill } =
    userInfo;
  console.log(userInfo);
  return (
    <InnerBox>
      {/* my page 내용 */}
      <MyInfo>
        <img
          src="https://velog.velcdn.com/images/seul-bean/profile/259fe091-ca51-424b-bf1a-aca4da376a9c/social_profile.png"
          alt="프로필 사진"
        />
        <div className="myInfo_text">
          <dl>
            <dt>Name</dt>
            <dd>{name}</dd>
          </dl>
          <dl>
            <dt>skill</dt>
            <dd>{skill}</dd>
          </dl>
          <dl>
            <dt>Introduce</dt>
            <dd>{introduce}</dd>
          </dl>
        </div>
      </MyInfo>

      {/* write 내용 */}
      <WriteBox>
        <dl>
          <dt>본인이 지원하고자 하는 회사란?</dt>
          <dd>{company}</dd>
        </dl>
        <dl>
          <dt>지원하게 된 동기?</dt>
          <dd>{motive}</dd>
        </dl>
        <dl>
          <dt>자신의 성장과정</dt>
          <dd>{grow}</dd>
        </dl>
        <dl>
          <dt>자신의 장단점</dt>
          <dd>{goodBad}</dd>
        </dl>
      </WriteBox>
      <button>수정</button>
      <button onClick={deleteInfo}>삭제</button>
    </InnerBox>
  );
}

export default Detail;
