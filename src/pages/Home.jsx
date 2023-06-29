import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { encode } from "url-safe-base64";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const nicknameHandler = (event) => {
    setNickname(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const signUp = (event) => {
    event.preventDefault();

    if (email === "" || nickname === "" || password === "" || name === "")
      return;

    const userCredential = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential) alert("회원가입 성공");

    const newUsers = {
      email,
      password,
      nickname,
      name,
    };
    const collectionRef = collection(db, "users");
    addDoc(collectionRef, newUsers);

    setEmail("");
    setNickname("");
    setPassword("");
    setName("");
  };

  const logIn = async (event) => {
    event.preventDefault();
    // setPersistence(auth, browserLocalPersistence);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const url = userCredential.user.email;
      if (userCredential) navigate(`/mypage/${encode(btoa(url))}`);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email")
        alert("이메일이 올바르지 않습니다.");
      if (errorCode === "auth/missing-password")
        alert("비밀번호를 작성해주세요");
      if (errorCode === "auth/wrong-password")
        alert("비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <div>
      Home
      <br />
      <form>
        <input
          type="text"
          placeholder="이메일"
          onChange={emailHandler}
          value={email}
        />
        <input
          type="text"
          placeholder="닉네임"
          onChange={nicknameHandler}
          value={nickname}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={passwordHandler}
          value={password}
        />
        <input
          type="text"
          placeholder="이름"
          onChange={nameHandler}
          value={name}
        />
        <button onClick={signUp}>회원가입</button>
        <button onClick={logIn}>로그인</button>
      </form>
      <br />
      <button onClick={() => navigate("/mypage/:id")}>마이페이지</button>
    </div>
  );
}

export default Home;
