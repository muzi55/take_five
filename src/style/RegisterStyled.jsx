import styled from 'styled-components';

export const Grid = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 20px 1fr 10px;
  grid-gap: 10px;
  align-items: center;
`;
export const Login = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  align-self: center;
  justify-self: center;
  border: none;
  background-color: #b9c0ba;
  padding: 10px;
  margin: 10px;
  width: 400px;
  height: 500px;
  display: grid;
`;
export const Form = styled.form`
  align-self: center;
  justify-self: center;
  display: grid;
  border: none;
`;
export const InputName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;
export const Input = styled.input`
  background-color: #575757;
  color: white;
  border: none;
  margin: 10px 0px 20px 0px;
  height: 45px;
  width: 330px;
  padding-left: 10px;
  &::placeholder {
    color: white;
  }
`;
export const InputMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-top: -15px;
  margin-bottom: -15px;
`;
export const LoginCenter = styled.div`
  text-align: center;
`;
export const LoginButton = styled.button`
  background-color: #6c8383;
  width: 100px;
  height: 40px;
  margin-top: 30px;
  margin-left: 5px;
  font-weight: bolder;
  font-size: 15px;
  border: none;
  &:focus {
    background-color: #4a666d;
  }
`;
