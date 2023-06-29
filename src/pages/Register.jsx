import React, { useCallback, useState } from 'react';
import * as S from '../component/RegisterStyled';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

function Register() {
  // 인풋창 useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickName, setNickname] = useState('');

  //오류메시지 상태저장
  const [nickNameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');

  // 유효성 검사
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  //onChange 개별
  const onChangeEmail = useCallback((event) => {
    const emailRule =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);
    if (!emailRule.test(emailCurrent)) {
      setEmailMessage('이메일 형식으로 다시 입력해주세요.');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  }, []);

  const onChangeNickname = useCallback((event) => {
    setNickname(event.target.value);
    if (event.target.value.length < 2 || event.target.value.length > 5) {
      setNicknameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMessage('올바른 이름 형식입니다.');
      setIsNickname(true);
    }
  }, []);

  const onChangePassword = useCallback((event) => {
    const passwordRule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);
    if (!passwordRule.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  }, []);

  const onChangePasswordCheck = useCallback(
    (event) => {
      const passwordCheckCurrent = event.target.value;
      setPasswordCheck(passwordCheckCurrent);
      if (password === passwordCheckCurrent) {
        setPasswordCheckMessage('입력한 비밀번호와 일치합니다.');
        setIsPasswordCheck(true);
      } else {
        setPasswordCheckMessage('비밀번호가 다릅니다. 다시 확인해주세요.');
        setIsPasswordCheck(false);
      }
    },
    [password]
  );

  const navigate = useNavigate();
  return (
    <S.Grid>
      <S.Login>
        <S.Form>
          <div>
            <S.InputName>이메일</S.InputName>
            <S.Input
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              name="email"
              onChange={onChangeEmail}
            />
            <S.InputMessage>
              {email.length > 0 && <span>{emailMessage}</span>}
            </S.InputMessage>
            <br />
            <S.InputName>닉네임</S.InputName>
            <S.Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickName}
              name="nickName"
              onChange={onChangeNickname}
            />
            <S.InputMessage>
              {nickName.length > 0 && <span>{nickNameMessage}</span>}
            </S.InputMessage>
            <br />
            <S.InputName>비밀번호</S.InputName>
            <S.Input
              type="password"
              placeholder="비밀번호을 입력해주세요"
              value={password}
              name="password"
              onChange={onChangePassword}
            />
            <S.InputMessage>
              {password.length > 0 && (
                <span>{passwordMessage}</span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>비밀번호 확인</S.InputName>

            <S.Input
              type="password"
              placeholder="다시 비밀번호를 입력해주세요"
              value={passwordCheck}
              name="passwordCheck"
              onChange={onChangePasswordCheck}
            />
            <S.InputMessage>
              {passwordCheck.length > 0 && <span>{passwordCheckMessage}</span>}
            </S.InputMessage>
          </div>
          <S.LoginCenter>
            <S.LoginButton
              type="submit"
              onClick={async (event) => {
                event.preventDefault();

                if (!email || !nickName || !passwordCheck || !password) {
                  alert('빈칸을 채워주세요!');
                } else {
                  try {
                    const userCredential = await createUserWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                    // const id = userCredential.user.uid;// uid:id,
                    const collectionRef = collection(db, 'user');
                    await addDoc(collectionRef, {
                      email: email,
                      nickName: nickName,
                    });
                    navigate('/profile');
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              가입하기
            </S.LoginButton>
          </S.LoginCenter>
        </S.Form>
      </S.Login>
    </S.Grid>
  );
}

export default Register;
