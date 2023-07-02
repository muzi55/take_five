import React, { useState, useRef, useEffect } from 'react';
import './../style/EditProfile.css';
import { auth, db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getUserId } from '../redux/modules/UserId';
import { decode, encode } from 'url-safe-base64';

function EditProfile() {
  let [isInputClickedName, setIsInputClickedName] = useState(false);
  let [isInputClickedNick, setIsInputClickedNick] = useState(false);
  let [isInputClickedIntro, setIsInputClickedIntro] = useState(false);
  let [isInputClickedSpec, setIsInputClickedSpec] = useState(false);

  const imgRef = useRef();
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const id = useSelector((state) => state.userId);

  const [name, setName] = useState(user.name);
  const [nickName, setNickName] = useState(user.nickName);
  const [introduce, setIntroduce] = useState(user.introduce);
  const [spec, setSpec] = useState(user.spec);
  const [imgFile, setImgFile] = useState(user.imgFile);

  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      console.log(users); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const dbUsers = query(
      collection(db, 'users'),
      where('email', '==', atob(decode(params.email)))
    );

    const usersData = [];
    const userId = [];

    const userSnapshot = await getDocs(dbUsers);

    userSnapshot.forEach((doc) => {
      usersData.push(doc.data());
      userId.push({ id: doc.id, email: doc.data().email });
    });
    dispatch(getUserInfo(...usersData));
    dispatch(getUserId(...userId));
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
              프로필 수정
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
              const updateInfoRef = doc(db, 'users', id.id);
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
        {/* 일단 보류 */}
        <button
          className="cancelbtn"
          onClick={() => {
            navigate(`/mypage/${encode(btoa(id.email))}`);
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
