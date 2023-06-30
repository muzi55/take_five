import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LikeImg from '../images/Like.svg';
import userDefault from '../images/userDefault.svg';
const ListItem = ({ lists }) => {
  return (
    <>
      {lists
        ? lists.map((list, index) => {
            const {
              imgFile,
              name,
              email,
              company,
              introduce,
              spec,
              like,
              id,
            } = list;

            // Hash는 다른곳에서 받아와야합니다.
            // id 말고, 다른 대체수단이 필요할 듯 싶다. 글을 쓸 시 => 새롭게 받아오는 글 고유의 id
            // date값을 받아와서, 정렬할 수 있는 수단이 필요할 거 같다.
            return (
              // key={index} 여기 수정해야합니다.
              <StListItem key={index}>
                <Link className="link" to={`/detail/${email}&${id}`}>
                  <StLikeSpan>
                    <img src={LikeImg} alt="하트모양 이미지" /> : {like}
                  </StLikeSpan>
                  <StListImgBox className="list-img-box">
                    {imgFile ? (
                      <img src={imgFile} alt="프로필 사진입니다" />
                    ) : (
                      <img src={userDefault} alt="프로필 사진입니다" />
                    )}
                  </StListImgBox>
                  <StListTextBox className="list-text-box">
                    <StHeading3>{name}</StHeading3>
                    <StListTextP>{company}</StListTextP>
                    <StListTextP opacity="0.8">{introduce}</StListTextP>
                    <StListTextP opacity="0.7" className="list-text-hash">
                      {spec}
                    </StListTextP>
                  </StListTextBox>
                </Link>
              </StListItem>
            );
          })
        : null}
    </>
  );
};
export default ListItem;
const StLikeSpan = styled.span`
  position: absolute;
  bottom: 7.5rem;
  right: 4rem;
  z-index: 10;
`;
const StListImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  margin-bottom: 10px;
  overflow: hidden;
  & > img {
    display: block;
    width: 90%;
  }
`;
const StListTextBox = styled.div`
  & p {
    font-size: 1rem;
  }
`;
const StListTextP = styled.p`
  opacity: ${(props) => props.opacity || '1'};
  margin-top: 10px;
  &:last-child {
    margin-top: 34px;
  }
`;
const StListItem = styled.li`
  position: relative;
  width: 19.375rem;
  box-sizing: border-box;
  overflow: hidden;
  padding: 38px 28px;
  border: 1px solid #464646;
  margin-bottom: 15px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;
const StHeading3 = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
