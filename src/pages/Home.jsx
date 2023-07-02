import React from 'react';
import * as H from '../style/HomeStyled';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';

function Home() {
  // 리덕스 스토어에 저장한 요소를 useselector로 불러왔습니다.
  const email = useSelector((state) => {
    return state.LoginModule.email;
  });
  const password = useSelector((state) => {
    return state.LoginModule.password;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 리덕스로 onchange 함수를 구현했습니다.
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      dispatch({ type: 'CHANGE_EMAIL', payload: value });
    }
    if (name === 'password') {
      dispatch({ type: 'CHANGE_PASSWORD', payload: value });
    }
  };

  return (
    <H.Grid>
      <H.GlobalStyle />
      <Sidebar width={400}>
        {/* //메인페이지의 로그인창을 사이드바로 구현했습니다. 
        세부사항은 컴포넌트 파일 사이드바에 있습니다.*/}
        <H.Login>
          <H.Form>
            <H.LoginName>LOGIN</H.LoginName>
            <div>
              <div>
                <H.ID>아이디</H.ID>
              </div>
              <H.Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                name="email"
                onChange={onChange}
              />

              <br />
              <div>
                <H.PW>비밀번호</H.PW>
              </div>
              <H.Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                name="password"
                onChange={onChange}
              />
            </div>
            <div>
              {/* navigate와 버튼을 이용해 회원가입 페이지로 이동합니다. */}
              <H.SignButton
                type="button"
                onClick={() => {
                  navigate('/register');
                }}
              >
                회원가입
              </H.SignButton>
              {/* 버튼을 통해 로그인을 하고, list 페이지로 이동합니다. */}
              <H.LoginButton
                type="submit"
                onClick={async (event) => {
                  event.preventDefault();
                  // 유효성 검사를 통해 빈칸이 하나라도 있을 시 alert가 뜹니다.
                  if (!email || !password) {
                    alert('빈칸을 채워주세요!');
                  } else {
                    try {
                      // 파이어베이스에 사용자 인증 및 사용자 정보를 저장합니다.
                      const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                      );
                      navigate('/list');
                      // 버튼을 누르면 빈칸으로 초기화됩니다.
                      dispatch({ type: 'CLEAR' });
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                로그인
              </H.LoginButton>
            </div>
          </H.Form>
        </H.Login>
      </Sidebar>
    </H.Grid>
  );
}
export default Home;
