import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle` 
  html{
  display: grid;
  justify-content: center;
  }
  body{
    background-color:#DFE0DC;
  }

`;
export const Grid = styled.span`
  display: grid;
  grid-template-columns: 30px 900px 30px 260px 120px;
  grid-template-rows: 30px 2fr 30px;
  grid-gap: 15px;
  align-items: center;
  min-width: 1400px;
`;
export const MainBox = styled.span`
  grid-column: 2/3;
  grid-row: 2/3;
  background-color: #6c8383;
  padding: 50px;
  height: 400px;
  display: grid;
  font-weight: bold;
`;
export const TitleBig = styled.span`
  font-size: 40px;
`;
export const TitleSmall = styled.span`
  font-size: 10px;
`;
export const Login = styled.div`
  grid-column: 4/5;
  grid-row: 2/3;
  align-self: center;
  justify-self: center;
  border: none;
  background-color: #b9c0ba;
  padding: 20px;
  margin: 10px;
  width: 250px;
  height: 300px;
  display: grid;
  text-align: center;
  font-weight: bold;
`;
export const Form = styled.form`
  display: grid;
  border: none;
`;

export const Input = styled.input`
  background-color: white;
  border: none;
  margin: 15px;
  height: 30px;
  width: 200px;
  &::placeholder {
    color: black;
    font-weight: bold;
  }
`;

export const SignButton = styled.button`
  background-color: #6c8383;
  width: 70px;
  height: 30px;
  margin-right: 5px;
  font-weight: bold;
  border: none;
  &:active {
    background-color: #4a666d;
  }
`;
export const LoginButton = styled.button`
  background-color: #6c8383;
  width: 70px;
  height: 30px;
  margin-left: 5px;
  font-weight: bold;
  border: none;
  &:active {
    background-color: #4a666d;
  }
`;
