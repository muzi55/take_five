import React, { useCallback } from 'react';
import * as S from '../style/RegisterStyled';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

function Register() {
  const {
    email,
    password,
    passwordCheck,
    nickName,
    emailMessage,
    passwordMessage,
    passwordCheckMessage,
    nickNameMessage,
  } = useSelector((state) => state.LoginModule);

  const dispatch = useDispatch();

  const onChangeEmail = useCallback((event) => {
    const emailRule =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    dispatch({ type: 'CHANGE_EMAIL', payload: emailCurrent });
    if (!emailRule.test(emailCurrent)) {
      dispatch({
        type: 'CHANGE_EMAIL_MESSAGE',
        payload: '이메일 형식으로 다시 입력해주세요.',
      });
    } else {
      dispatch({
        type: 'CHANGE_EMAIL_MESSAGE',
        payload: '올바른 이메일 형식입니다.',
      });
    }
  }, []);

  const onChangeNickname = useCallback((event) => {
    dispatch({ type: 'CHANGE_NICKNAME', payload: event.target.value });
    if (event.target.value.length < 2 || event.target.value.length > 5) {
      dispatch({
        type: 'CHANGE_NICKNAME_MESSAGE',
        payload: '2글자 이상 5글자 미만으로 입력해주세요.',
      });
    } else {
      dispatch({
        type: 'CHANGE_NICKNAME_MESSAGE',
        payload: '올바른 이름 형식입니다.',
      });
    }
  }, []);

  const onChangePassword = useCallback((event) => {
    const passwordRule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = event.target.value;
    dispatch({ type: 'CHANGE_PASSWORD', payload: passwordCurrent });
    if (!passwordRule.test(passwordCurrent)) {
      dispatch({
        type: 'CHANGE_PASSWORD_MESSAGE',
        payload: '숫자+영문자+특수문자 조합으로 입력해주세요.',
      });
    } else {
      dispatch({
        type: 'CHANGE_PASSWORD_MESSAGE',
        payload: '올바른 비밀번호 형식입니다.',
      });
    }
  }, []);
  const onChangePasswordCheck = useCallback(
    (event) => {
      const passwordCheckCurrent = event.target.value;
      dispatch({ type: 'CHANGE_PASSWORDCHECK', payload: passwordCheckCurrent });
      if (password === passwordCheckCurrent) {
        dispatch({
          type: 'CHANGE_PASSWORDCHECK_MESSAGE',
          payload: '입력한 비밀번호와 일치합니다.',
        });
      } else {
        dispatch({
          type: 'CHANGE_PASSWORDCHECK_MESSAGE',
          payload: '비밀번호가 다릅니다. 다시 확인해주세요.',
        });
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
              {password.length > 0 && <span>{passwordMessage}</span>}
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
                    const collectionRef = collection(db, 'users');
                    await addDoc(collectionRef, {
                      email: email,
                      nickName: nickName,
                    });
                    navigate('/editprofile/:email');
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
