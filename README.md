# 리액트 B반 5조 팀프로젝트입니다.

## 팀원

📌 안홍민 **👑**

- muzi5@kakao.com
- [깃허브아이디(레포지토리링크)](https://github.com/muzi55)
- 12일 월세내는날(오늘임) 오늘기분좋음

📌 김슬기



- [seul-bean (seul-bean) - velog](https://velog.io/@seul-bean)
- [kimseulgi-creator (seulgi) (github.com)](https://github.com/kimseulgi-creator)

📌 백예나



- 담당: 미정
- jntantmsemt@naver.com
- [깃허브아이디(레포지토리링크)](https://github.com/whybwhyd)
- 인도커리 먹고 싶어요

📌 김성훈



- 뭐라도 담당하는중
- rmdkak99786@naver.com
- https://github.com/rmdkak
- 개도 안걸리는 여름감기 걸림

📌 박진희



- 담당
- jhp202@naver.com
- https://github.com/ZINY020
- 커피 좋아함

## 와이어프레임, 노션

[노션](https://www.notion.so/take-five-4c21411bacab425681030199b2efcbe4/),
[피그마](https://www.figma.com/file/wSCTcHfKxT2cn55fpiYT2A/Untitled?type=design&node-id=0%3A1&mode=design&t=YqQ3c2tqTji6Ircl-1/)

## 팀규칙

1. 팀원을 존중해야합니다. !
2. 묻는 내용에 대해 성심성의껏 대답해 줍니다.
3. 질문은 부끄러운게 아니니 진짜 모르겠으면 물어봅시다!

## 컨벤션

### GIT CONVENTION

**커밋 메세지 작성 가이드**

```
type: Subject -> 제목
(한칸 띄우기)
body(생략 가능) -> 본문
(한칸 띄우기)
~~footer(생략 가능) -> 꼬리말 (여기는 지금 우리에겐 고려하지 않아도 무방)~~
```

**제목 → type의 종류**

| Type      | 설명                                                                               |     |
| --------- | ---------------------------------------------------------------------------------- | --- |
| Feat:     | 새로운 기능 추가                                                                   |     |
| Fix:      | 버그 수정 또는 typo                                                                |     |
| Refactor: | 리팩토링                                                                           |     |
| Design:   | CSS 등 사용자 UI 디자인 변경                                                       |     |
| Comment:  | 필요한 주석 추가 및 변경                                                           |     |
| Style:    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우                                  |     |
| Test:     | 테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)             |     |
| Chore:    | 위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등) |     |
| Init:     | 프로젝트 초기 생성                                                                 |     |
| Rename:   | 파일 혹은 폴더명 수정하거나 옮기는 경우                                            |     |
| Remove:   | 파일을 삭제하는 작업만 수행하는 경우                                               |     |
|           |                                                                                    |     |

**제목 내용을 작성할 때 고려할 것들**

1. 제목은 최대 50글자 넘지 않기
2. 마침표 & 특수기호 사용x
3. 첫 글자 대문자, 명령문 사용
4. 개조식 구문으로 작성(간결하고 요점적인 서술)

**본문 내용을 작성할 때 고려할 것들**

1. 한 줄당 200자 내로 작성
2. 최대한 상세히 작성
3. 어떻게 보다는 '무엇을', '왜' 사용했는지에 대해 작성

**커밋 메세지 작성 예시**

```
Feat: singin,login in mainpage, logout in subpage 추가

메인페이지에 회원가입,로그인 기능 추가
서브페이지에 로그아웃 기능 추가
아직 기능만 추가되었고 CSS 적용 전 입니다
```

## 우리 팀 GIT-FLOW

각자의 기능을 맡은 feat/기능의 이름으로 branch들을 로컬환경에서 구성

→ 팀 git repository에 각자의 branch로 commit, push

→ 이후 기능에서 추가적으로 생성된 기능이 있다면 local branch에서 새롭게 branch 생성 후 완료되면 동일하게 commit, push

→ 각 기능들이 완성되면 dev branch에서 합치고 이상없을 시 main으로 이동

** dev, master/main branch엔 오로지 PR, confirm 후 merge 순서로 진행(절대로 직접적인 접근 금지) **

** dev에서 합친 내용에 수정 사항 및 오류 사항이 생길 시 fix branch에서 해결 후 다시 push **

### GIT CONVENTION

**커밋 메세지 작성 가이드**

```
type: Subject -> 제목
(한칸 띄우기)
body(생략 가능) -> 본문
(한칸 띄우기)
~~footer(생략 가능) -> 꼬리말 (여기는 지금 우리에겐 고려하지 않아도 무방)~~
```

**제목 → type의 종류**

| Type      | 설명                                                                               |     |
| --------- | ---------------------------------------------------------------------------------- | --- |
| Feat:     | 새로운 기능 추가                                                                   |     |
| Fix:      | 버그 수정 또는 typo                                                                |     |
| Refactor: | 리팩토링                                                                           |     |
| Design:   | CSS 등 사용자 UI 디자인 변경                                                       |     |
| Comment:  | 필요한 주석 추가 및 변경                                                           |     |
| Style:    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우                                  |     |
| Test:     | 테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)             |     |
| Chore:    | 위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등) |     |
| Init:     | 프로젝트 초기 생성                                                                 |     |
| Rename:   | 파일 혹은 폴더명 수정하거나 옮기는 경우                                            |     |
| Remove:   | 파일을 삭제하는 작업만 수행하는 경우                                               |     |
|           |                                                                                    |     |

**제목 내용을 작성할 때 고려할 것들**

1. 제목은 최대 50글자 넘지 않기
2. 마침표 & 특수기호 사용x
3. 첫 글자 대문자, 명령문 사용
4. 개조식 구문으로 작성(간결하고 요점적인 서술)

**본문 내용을 작성할 때 고려할 것들**

1. 한 줄당 72자 내로 작성
2. 최대한 상세히 작성
3. 어떻게 보다는 '무엇을', '왜' 사용했는지에 대해 작성

**커밋 메세지 작성 예시**

```
Feat: singin,login in mainpage, logout in subpage 추가

메인페이지에 회원가입,로그인 기능 추가
서브페이지에 로그아웃 기능 추가
아직 기능만 추가되었고 CSS 적용 전 입니다
```

