import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LikeImg from '../images/Like.svg';
import userDefault from '../images/userDefault.svg';
import './../style/SkeletonUi.css';
import heart from '../images/heart_.svg';
import { encode } from 'url-safe-base64';
import loading from '../images/loading.gif';

const ListItem = ({ lists }) => {
  const imgLike = 'https://i.postimg.cc/59qL9m7h/jordy4.webp';
  return (
    <>
      {
        // 스켈레톤UI 조건입니다.
        // 화면에 lists.legnth 의 값이 1 이상이면  firestore에서 가져온 값을 뿌려주며,
        // lists.legnth 값이 1보다 작다면, 즉 값이 없다면? => 스켈레톤Ui를 뿌려줍니다.

        // 스켈레톤 UI의 핵심 아이디어는 사용자가 콘텐츠가 로드되고 있는지 알 수 있도록
        // 시각적인 힌트를 제공하는 것입니다.

        // 스켈레톤UI는 사용자에게 로딩진행 상태를 시각적으로 전달해
        // 사용자 경험을 향상시키고, 사용자들이 애플리케이션을 긍정적으로
        // 인식할 수 있게 됩니다.

        // 데이터 로드 자체가 빠르거나, skeleton UI가 필요하지 않는 경우는 null 체크를 사용하여 뎅이터가
        // 없을때 대체 내용을 표시할 수 있습니다. !

        // 스켈레톤의 장단점
        // 장점은 스켈레톤은 블랭크 페이지 < 스피너 < 스켈레톤 순서대로 더 빠르다고 느껴지고,
        // 단점은 스켈레톤을 화면마다 표시해야 되기 때문에 상대적으로 시간이나 비용이 더 듭니다.

        // 이 null check방법은 바꿔야 할 거 같습니다.
        // legnth의 값이 1과 같거나 크다면? =>  이부분은 나중에 리스트의 글이 없다면
        // 계속 스켈레톤 이미지를 보여주는상황인게 문제입니다.

        // 더 나은 경험을 위한 스켈레톤 규칙
        // 스켈레톤은 콘텐츠의 로드를 방해하면 안됩니다. => 실제 콘텐츠는 데이터를 기용할 수 있는 시점이 되면 즉시 스켈레톤을 대체해야합니다.
        // 스켈레톤을 디자인 할 때 애니메이션을 사용하는 것이 좋습니다. => 애니메이션은 wave, pulse 중 wave를 사용하는것이 로딩이 더 짧다고 느껴집니다.
        // 느리고 안정된 애니메이션을 사용하는것이 로딩 시간을 더 짧게 느끼게끔 합니다.
        lists.length >= 1 ? (
          lists.map((list, index) => {
            const { imgFile, name, email, company, introduce, spec, like, id } =
              list;

            return (
              // key={index} 여기 수정해야합니다.
              <StListItem key={index}>
                <Link
                  className="link"
                  to={`/detail/${encode(btoa(email))}&${id}`}
                >
                  <StListImgBox className="list-img-box">
                    {/* firestore에 프로필 이미지가 있다면? 
                    그 이미지를 사용하고, 
                    없다면 기본 이미지를 사용합니다. */}
                    {imgFile ? (
                      <img src={imgFile} alt="프로필 사진입니다" />
                    ) : (
                      <img src={userDefault} alt="프로필 사진입니다" />
                    )}
                  </StListImgBox>
                  <StListTextBox className="list-text-box">
                    <StLikeSpan>
                      <span>{like}</span>
                      {/* 좋아요가 1이상인 경우 속이 찬 하트로 보여짐 */}
                      <img
                        src={like > 0 ? heart : LikeImg}
                        alt="하트모양 이미지"
                      />
                    </StLikeSpan>
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
        ) : (
          //
          // SkeletonUI 부분
          //
          // null Checking으로도 문제는없지만 null을 띄워주면,
          // 화면에 아무것도 보이지 않으므로 사용자경험을 해칠 우려가 있습니다.
          <SkeletonUi>
            {/* <img src={imgLike} alt="로딩중" /> */}
            {/* <img src={loading} alt="로딩중" />
             */}
            <div class="loding">
              <svg width="300" height="300" viewBox="0 0 50 50">
                <path
                  opacity="0.2"
                  d="M25,2.784C12.73,2.784,2.783,12.73,2.783,25S12.73,47.217,25,47.217S47.217,37.27,47.217,25
	S37.27,2.784,25,2.784z M25,45.161C13.866,45.161,4.839,36.135,4.839,25C4.839,13.866,13.866,4.839,25,4.839
	c11.134,0,20.161,9.026,20.161,20.161C45.161,36.135,36.134,45.161,25,45.161z"
                />
                <path
                  fill="#2af598"
                  d="M25.029,4.841c1.532,0.002,3.018,0.189,4.452,0.516l0.456-2.015c-1.579-0.359-3.22-0.555-4.908-0.557V4.841z"
                >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          </SkeletonUi>
        )
      }
    </>
  );
};
export default ListItem;
const StLikeSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 40px;
  font-size: 20px;
  font-weight: bold;
  z-index: 10;
  & img {
    margin-left: 10px;
    width: 31px;
  }
`;
const StListImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  margin-top: 30px;
  margin-bottom: 20px;
  overflow: hidden;

  & > img {
    display: block;
    width: auto;
  }
`;
const StListTextBox = styled.div`
  position: relative;
  padding: 0 40px;
  & p {
    font-size: 1rem;
  }
`;
const StListTextP = styled.p`
  opacity: ${(props) => props.opacity || '1'};
  &:last-child {
    margin-top: 20px;
    padding-bottom: 22px;
  }
`;
const StListItem = styled.li`
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #464646;
  margin-bottom: 15px;
  width: 346px;

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

const SkeletonUi = styled.div`
  display: flex;
  width: 1086px;
  height: 500px;
  justify-content: center;
  align-items: center;
  & img {
    display: block;
  }
`;
