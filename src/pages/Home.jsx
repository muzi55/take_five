import React, { useState, useEffect } from 'react';
import * as H from '../component/HomeStyled';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
      console.log('user', user);
    });
  }, []);

  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <H.Grid>
      <H.GlobalStyle />
      <H.MainBox>
        <div>
          <H.TitleBig>자기 P</H.TitleBig>
          <H.TitleSmall>ublic </H.TitleSmall>
          <H.TitleBig>R</H.TitleBig>
          <H.TitleSmall>elations </H.TitleSmall>
          <H.TitleBig>actic</H.TitleBig>
          <br />
          <br />
          <br />
          <p>
            자기 pr을 연습해보세요!
            <br />
            <br />
            <br />
            자기 자신을 스스로 다른 사람들에게 알리는 <br />
            <br />
            자기pr을 연습하기 위한 페이지입니다.
            <br />
            <br />
            <br />
            자신의 강점을 알고 소개하는 방법을 sns방식으로 터득할 수 있습니다.
            <br />
            <br />
            한 단계 발전하기 위해 타인의 pr도 살펴보세요.
            <br />
            <br />
          </p>
        </div>
      </H.MainBox>

      {/* //메인페이지의 로그인창입니다. */}
      <H.Login>
        <H.Form>
          Login
          <div>
            <H.Input
              type="email"
              placeholder="이메일"
              value={email}
              name="email"
              onChange={onChange}
            />

            <br />
            <H.Input
              type="password"
              placeholder="비밀번호"
              value={password}
              name="password"
              onChange={onChange}
            />
          </div>
          <div>
            <H.SignButton
              type="button"
              onClick={() => {
                navigate('/register');
              }}
            >
              회원가입
            </H.SignButton>
            <H.LoginButton
              type="submit"
              onClick={async (event) => {
                event.preventDefault();
                if (!email || !password) {
                  alert('빈칸을 채워주세요!');
                } else {
                  try {
                    const userCredential = await signInWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                    navigate('/list');
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
    </H.Grid>
  );
}

export default Home;
