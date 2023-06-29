import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { InnerBox } from './Write';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & img {
    background-color: darkseagreen;
    border-radius: 100%;
  }
  & .myInfo_text {
    margin-left: 100px;
    & dl {
      width: 500px;
      height: 40px;
      display: flex;
      background-color: #dfe0dc;
      padding: 0 20px;
      align-items: center;
      margin: 30px 0;
    }
    & dt {
      font-size: 18px;
      font-weight: bold;
      width: 80px;
    }

    & dl:nth-child(3) {
      height: 130px;
      display: flex;
      align-items: normal;
      padding: 20px;
      flex-direction: column;
    }
    & dl:nth-child(3) dt {
      font-size: 18px;
      font-weight: bold;
      width: 150px;
    }
    & dl:nth-child(3) dd {
      margin-top: 20px;
    }
  }
`;

const WriteBox = styled.div`
  margin-top: 120px;
  & dl {
    height: 185px;
    padding: 20px;
    background-color: #dfe0dc;
    margin: 30px 0;

    & dt {
      font-size: 18px;
      font-weight: bold;
    }

    & dd {
      margin-top: 20px;
      font-size: 16px;
    }
  }
`;

function Detail() {
  const param = useParams();
  const paramEmail = param.email.split('$')[0];
  console.log(paramEmail);
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
      console.log(initialInfos);
      console.log(initialUsers);

      const filterInfo = initialInfos.filter((info) => {
        if (info.email === paramEmail) {
          return info;
        }
      });

      initialUsers.filter((user) => {
        console.log(user.email);
        if (user.email === paramEmail) {
          console.log('1');
          setUserInfo({ ...filterInfo[0], ...user });
        }
      });

      // querySnapshot.forEach((doc) => {
      //   initialTodos.push({ id: doc.id, ...doc.data() });
      // });

      // firestore에서 가져온 데이터를 state에 전달
      // setTodos(initialTodos);
    };

    fetchData();
  }, []);

  const { company, goodbad, grow, introduce, like, motive, name, skill } =
    userInfo;
  //----------------------------------------------------------------------------

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
          <dd>{goodbad}</dd>
        </dl>
      </WriteBox>
    </InnerBox>
  );
}

export default Detail;
