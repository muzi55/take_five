import React, { useCallback } from 'react';
import * as S from '../style/RegisterStyled';
import { LoginButton } from '../style/RegisterStyled';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

function Register() {
  //  리덕스 스토어에 저장한 요소를 useselector로 불러왔습니다.
  const {
    // 이메일,닉네임,비밀번호,비밀번호 확인
    email,
    password,
    passwordCheck,
    nickName,
    // 오류메세지
    emailMessage,
    passwordMessage,
    passwordCheckMessage,
    nickNameMessage,
    // 유효성 검사
    isEmail,
    isNickName,
    isPassword,
    isPasswordCheck,
  } = useSelector((state) => state.LoginModule);

  const dispatch = useDispatch();
  // onchange 함수를 리듀서로 만들었습니다.
  // 성능 최적화를 위해 usecallback을 사용했습니다.
  const onChangeEmail = useCallback((event) => {
    dispatch({ type: 'CHANGE_EMAIL', payload: event.target.value });
    dispatch({
      type: 'CHANGE_EMAIL_MESSAGE',
      payload: event.target.value,
    });
  }, []);

  const onChangeNickname = useCallback((event) => {
    dispatch({ type: 'CHANGE_NICKNAME', payload: event.target.value });
    dispatch({
      type: 'CHANGE_NICKNAME_MESSAGE',
      payload: event.target.value,
    });
  }, []);

  const onChangePassword = useCallback((event) => {
    dispatch({ type: 'CHANGE_PASSWORD', payload: event.target.value });
    dispatch({
      type: 'CHANGE_PASSWORD_MESSAGE',
      payload: event.target.value,
    });
  }, []);
  // 비밀번호 확인은 비밀번호를 종속성으로 둡니다.
  const onChangePasswordCheck = useCallback(
    (event) => {
      dispatch({ type: 'CHANGE_PASSWORDCHECK', payload: event.target.value });
      dispatch({
        type: 'CHANGE_PASSWORDCHECK_MESSAGE',
        payload: event.target.value,
      });
    },
    [password]
  );
  const navigate = useNavigate();
  return (
    <S.Grid>
      <S.Left />
      <S.Right />
      <S.Login>
        <S.Form>
          <div>
            <S.InputName>이메일</S.InputName>
            {/* 이메일을 적는 인풋창입니다. */}
            <S.Input
              type="text"
              placeholder="email@talentconnect.com"
              value={email}
              name="email"
              onChange={onChangeEmail}
            />
            {/* 인풋창의 유효성 검사를 위한 메세지입니다.
            빈칸이 아닌 경우에 메세지를 띄우고,
            조건 충족에 따라 스타일을 바꾸기 위해 클래스 네임을 
            삼항연산자로 적었습니다. */}
            <S.InputMessage>
              {email.length > 0 && (
                <span className={`${isEmail ? 'error' : 'success'}`}>
                  {emailMessage}
                </span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>닉네임</S.InputName>
            <S.Input
              type="text"
              placeholder="nickname"
              value={nickName}
              name="nickName"
              onChange={onChangeNickname}
            />
            <S.InputMessage>
              {nickName.length > 0 && (
                <span className={`${isNickName ? 'error' : 'success'}`}>
                  {nickNameMessage}
                </span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>비밀번호</S.InputName>
            <S.Input
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={onChangePassword}
            />
            <S.InputMessage>
              {password.length > 0 && (
                <span className={`${isPassword ? 'error' : 'success'}`}>
                  {passwordMessage}
                </span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>비밀번호 확인</S.InputName>

            <S.Input
              type="password"
              placeholder="password"
              value={passwordCheck}
              name="passwordCheck"
              onChange={onChangePasswordCheck}
            />
            <S.InputMessage>
              {passwordCheck.length > 0 && (
                <span className={`${isPasswordCheck ? 'error' : 'success'}`}>
                  {passwordCheckMessage}
                </span>
              )}
            </S.InputMessage>
          </div>
          <S.LoginCenter>
            {/* 가입을 위한 버튼입니다.
            빈칸이 있는 경우 alert가 뜨며
            email password를 파이어 베이스 인증을 위해 저장하고,
            뉴스피드 콘텐츠를 위해 이메일, 닉네임을 파이어스토어에 저장합니다.  */}
            <LoginButton
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
                    const collectionRef = collection(db, 'users');
                    await addDoc(collectionRef, {
                      email: email,
                      nickName: nickName,
                    });
                    // 가입이 정상적으로 되면 프로필 페이지로 넘어갑니다.
                    navigate('/AddProfile/', {
                      state: { email: email, nick: nickName },
                    });
                    // 버튼을 누르면 인풋창이 빈칸으로 초기화됩니다.
                    dispatch({ type: 'CLEAR' });
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              가입하기
            </LoginButton>
          </S.LoginCenter>
        </S.Form>
      </S.Login>
    </S.Grid>
  );
}

export default Register;
