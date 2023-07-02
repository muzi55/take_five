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
    width: 230px;
    height: 230px;
    border: 6px solid #fff;
    box-shadow: 3px 3px 5px 0px #00000050;
  }
  & .myInfo_text {
    margin-left: 70px;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: center;
    padding: 0px 20px;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 3px 3px 5px 0px #00000050;
    & dl {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
  }
  & dt {
    font-size: 20px;
    font-weight: bold;
    width: 130px;
  }
  & dd {
    font-size: 18px;
  }
`;

export const InfoBox = styled.div`
  margin-top: 80px;
  & h2 {
    padding: 20px;
    margin: 30px 0;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 3px 3px 5px 0px #00000050;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
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
