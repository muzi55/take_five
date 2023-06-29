import { styled } from 'styled-components';

export const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & img {
    background-color: darkseagreen;
    border-radius: 100%;
  }
  & .myInfo_text {
    margin-left: 100px;
    & dl {
      width: 500px;
      height: 40px;
      display: flex;
      background-color: #dfe0dc;
      padding: 0 20px;
      align-items: center;
      margin: 30px 0;
    }
    & dt {
      font-size: 18px;
      font-weight: bold;
      width: 80px;
    }

    & dl:nth-child(3) {
      height: 130px;
      display: flex;
      align-items: normal;
      padding: 20px;
      flex-direction: column;
    }
    & dl:nth-child(3) dt {
      font-size: 18px;
      font-weight: bold;
      width: 150px;
    }
    & dl:nth-child(3) dd {
      margin-top: 20px;
    }
  }
`;

export const WriteBox = styled.div`
  margin-top: 120px;
  & dl {
    height: 185px;
    padding: 20px;
    background-color: #dfe0dc;
    margin: 30px 0;

    & dt {
      font-size: 18px;
      font-weight: bold;
    }

    & dd {
      margin-top: 20px;
      font-size: 16px;
    }
  }
`;
