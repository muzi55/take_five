import React from 'react';

function List() {
  return (
    <section>
      <h2>리스트 페이지</h2>

      <form onSubmit={(e) => e.preventDefault()} method="#" action="#">
        <button> 글쓰기</button>
      </form>

      <section>
        <h3>리스트 섹션</h3>

        <div>
          <p>최신순</p>
          <ul>
            <li>
              {/*  */}
              <div>
                {/* 리스트 박스 */}
                <div>
                  {/* 이미지 박스 */}
                  <img src="" alt="프로필 이미지" />
                </div>
                <div>
                  {/* 텍스트 박스 */}
                  <h4>이름</h4>
                  <p>지원하는 회사 명</p>
                  <p>자기소개</p>
                  <p>해쉬태그</p>
                </div>
              </div>
              {/*  */}
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default List;
