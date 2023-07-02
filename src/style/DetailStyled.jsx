import { styled } from 'styled-components';

export const MyInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 80px;

  & img {
    border-radius: 100%;
    width: 200px;
  }
  & .myInfo_text {
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: center;
    & dl {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
  }
  & dt {
    font-size: 18px;
    font-weight: bold;
    width: 120px;
  }
`;

export const WriteBox = styled.div`
  margin-top: 80px;
  & h2 {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 80px;
  }
  & dl {
    padding: 20px;
    height: 185px;
    margin: 30px 0;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 3px 3px 5px 0px #00000050;

    & dt {
      font-size: 24px;
      font-weight: bold;
    }

    & dd {
      margin-top: 20px;
      font-size: 16px;
    }
  }
`;
