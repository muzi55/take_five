import React, { useState, useRef, useEffect } from 'react';
import './../style/EditProfile.css';
import { auth, db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/modules/UserInfo';

function AddProfile() {
  let [isInputClickedName, setIsInputClickedName] = useState(false);
  let [isInputClickedNick, setIsInputClickedNick] = useState(false);
  let [isInputClickedIntro, setIsInputClickedIntro] = useState(false);
  let [isInputClickedSpec, setIsInputClickedSpec] = useState(false);

  // 프로필 정보 변수들
  const [name, setName] = useState('');
  let [nickName, setNickName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [spec, setSpec] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  // useLocation을 이용해 Register(회원가입) 페이지에서 email과 nickName 값을 전달받기
  const location = useLocation();
  const email = location.state.email;
  nickName = location.state.nick;

  // 페이지 렌더링시 fetchUserData 실행
  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      console.log(users); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
    fetchUserData();
  }, []);

  // firebase에서 users 컬렉션에서 회원가입때 입력한 email이 같은 계정의 데이터 읽어오기
  const fetchUserData = async () => {
    const dbUsers = query(collection(db, 'users'), where('email', '==', email));

    const usersData = [];

    const userSnapshot = await getDocs(dbUsers);
    userSnapshot.forEach((doc) => {
      usersData.push({ id: doc.id });
    });
    dispatch(getUserInfo(...usersData));
  };

  const saveName = (event) => {
    setName(event.target.value);
  };

  const saveNickName = (event) => {
    setNickName(event.target.value);
  };

  const saveIntro = (event) => {
    setIntroduce(event.target.value);
  };

  const saveSpec = (event) => {
    setSpec(event.target.value);
  };

  //

  // 이미지 업로드 input의 onChange
  const saveImgFile = async () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const deleteImg = () => {
    setImgFile('');
  };

  const navigate = useNavigate();
  return (
    <div className="upload">
      <h2 className="profile_title">프로필 설정</h2> <br />
      <p className="guide_coment">
        고객과 회사에게 보여지는 정보를 설정해주세요.
      </p>
      <br />
      <div className="editbox">
        <div className="divUP">
          <img
            className="profileImg"
            src={imgFile ? imgFile : '/user.png'}
            alt="이미지 수정"
          />
          <br />
          <div className="imgUpload">
            <label className="input-profileImg-label" htmlFor="inputprofileImg">
              사진 넣기
            </label>
            <form>
              <input
                id="inputprofileImg"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={saveImgFile}
                ref={imgRef}
              />
            </form>
            <label
              className="delete-profileImg-label"
              htmlFor="deleteprofileImg"
            >
              삭제
            </label>
            <input
              id="deleteprofileImg"
              type="button"
              up
              onClick={deleteImg}
            ></input>
          </div>
          <br />
          <br />
        </div>
        {/* // false = input이 클릭되어 있지 않을 때, true = input이 클릭되어 있을 때 */}
        <div className="editlist">
          <div className="divname">
            이름
            <input
              className="inputName"
              // 클릭될 때 작동
              onFocus={() => {
                setIsInputClickedName(true);
              }}
              // 클릭되어 있지 않을 때 작동 input 이외의 영역이 클릭 되었을 때
              onBlur={() => {
                setIsInputClickedName(false);
              }}
              // placeholder의 내용을 해당 input을 클릭시 비우고 다른 곳을 클릭시 placeholder의 내용을 보이게 하기 위해 setIsInputClick~~() 를 이용
              placeholder={
                isInputClickedName === true ? '' : '이름을 입력해주세요.'
              }
              type="text"
              value={name}
              onChange={saveName}
            ></input>
          </div>
          <div className="divnick">
            닉네임
            <input
              className="inputNick"
              // 클릭될 때 작동
              onFocus={() => {
                setIsInputClickedNick(true);
              }}
              // 클릭되어 있지 않을 때 작동 input 이외의 영역이 클릭 되었을 때
              onBlur={() => {
                setIsInputClickedNick(false);
              }}
              placeholder={
                isInputClickedNick === true ? '' : '닉네임을 입력해주세요.'
              }
              type="text"
              value={nickName}
              onChange={saveNickName}
            ></input>
          </div>
          <div className="divintro">
            소개글
            <input
              className="inputIntro"
              // 클릭될 때 작동
              onFocus={() => {
                setIsInputClickedIntro(true);
              }}
              // 클릭되어 있지 않을 때 작동 input 이외의 영역이 클릭 되었을 때
              onBlur={() => {
                setIsInputClickedIntro(false);
              }}
              placeholder={
                isInputClickedIntro === true ? '' : '소개글을 입력해주세요.'
              }
              type="text"
              value={introduce}
              onChange={saveIntro}
            ></input>
          </div>
          <div className="divsp">
            자기 스펙
            <input
              className="inputSpec"
              // 클릭될 때 작동
              onFocus={() => {
                setIsInputClickedSpec(true);
              }}
              // 클릭되어 있지 않을 때 작동 input 이외의 영역이 클릭 되었을 때
              onBlur={() => {
                setIsInputClickedSpec(false);
              }}
              placeholder={
                isInputClickedSpec === true ? '' : '자기스펙을 입력해주세요.'
              }
              type="text"
              value={spec}
              onChange={saveSpec}
            ></input>
          </div>
        </div>
      </div>
      <br />
      <div className="buttonbox">
        <button
          className="finishbtn"
          onClick={async () => {
            try {
              // 5개의 값을 firebase의 users 컬렉션에서 회원가입한 해당 계정에 데이터를 저장
              const updateInfoRef = doc(db, 'users', user.id);
              await updateDoc(updateInfoRef, {
                name,
                nickName,
                introduce,
                spec,
                imgFile,
              });

              console.log('Document written with ID: ', updateInfoRef.id);
            } catch (e) {
              console.error('Error adding document: ', e);
            }
            alert('프로필이 저장되었습니다.🎉');
            navigate('/list');
          }}
        >
          저장
        </button>
        <button
          className="cancelbtn"
          onClick={() => {
            navigate('/');
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default AddProfile;
