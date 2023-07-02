import React from 'react';
import * as H from '../style/HomeStyled';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { loginmail } from '../redux/modules/loginEmail';

function Home() {
  const email = useSelector((state) => {
    return state.LoginModule.email;
  });
  const password = useSelector((state) => {
    return state.LoginModule.password;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <H.MainBox>
        <div>
          <div>
            {/* 사진으로 바꾸거나 고민해보기기 */}
            <H.TitleBig>자기 P</H.TitleBig>
            <H.TitleSmall>ublic </H.TitleSmall>
            <H.TitleBig>R</H.TitleBig>
            <H.TitleSmall>elations </H.TitleSmall>
            <H.TitleBig>actic</H.TitleBig>
          </div>
          <br />
          <br />
          <div>
            <div>자기 pr을 연습해보세요!</div>
            <br />
            <br />
            <div>
              자기 자신을 스스로 다른 사람들에게 알리는 <br /> <br />
              자기pr을 연습하기 위한 페이지입니다.
            </div>
            <br />
            <br />
            <div>
              자신의 강점을 알고 소개하는 방법을 sns방식으로 터득할 수 있습니다.
            </div>
            <br />
            <div>한 단계 발전하기 위해 타인의 pr도 살펴보세요.</div>
          </div>
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
                    //
                    // 로그인 될때 email 값을 받아와야해서 추가했습니다 => 홍민
                    // 로그인 버튼을 눌렀을때 => email을 redux로 보내서 내가 사용합니다. !
                    dispatch(loginmail(email));
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              {' '}
              로그인
            </H.LoginButton>
          </div>
        </H.Form>
      </H.Login>
    </H.Grid>
  );
}
export default Home;
