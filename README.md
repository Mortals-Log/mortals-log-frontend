# Jinwoo Archive 🎵

## 🚧 유의사항

- 본 프로젝트는 **비공식 팬 프로젝트**입니다.
- 모든 콘텐츠의 저작권은 원 저작자에게 있습니다.
  <br>

## 🎧 JINWOO-Archive

가수 **천진우**의 정보를 한 곳에서 확인할 수 있는 팬페이지 웹앱입니다.  
프로필, 앨범, 일정 등 흩어져 있는 정보를 정리하여 팬과 유입층 모두가 빠르게 **천진우**를 알 수 있도록 합니다.
<br>

## 🔍 프로젝트 개요

- **프로젝트명**: Jinwoo Archive
- **목적**
  - 천진우의 프로필, 앨범, 일정 정보를 한 곳에서 제공
  - 팬들이 가장 빠르게 주요 일정과 소식을 확인할 수 있도록 지원
- **플랫폼**
  - React 기반 웹앱
  - 향후 React Native를 통한 멀티플랫폼 확장 고려
    <br>

## 🛠 Tech Stack

| 역할                        | 종류                                                                                                                                                                                                                            | 선정 이유                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Library**                 | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                              | UI를 재사용 가능한 컴포넌트로 구성하여 개발 및 유지보수가 용이함.                                                                                                              |
| **Programming Language**    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                               | 정적 타입 언어로, 컴파일 단계에서 타입을 체크하여 안정적인 코드 작성이 가능함.                                                                                                 |
| **Styling**                 | ![Styled-Components](https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logoColor=white)                                                                                                                           | 스타일을 로직과 결합된 컴포넌트 단위로 모듈화하여, 스타일 충돌 없이 높은 재사용성과 직관적인 코드 구조를 유지할 수 있음                                                        |
| **Data Fetching**           | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) | 비동기 데이터 관리와 캐싱을 효율적으로 처리하며, 서버 상태를 간단히 관리 가능.                                                                                                 |
| **API Documentation**       | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black)                                                                                                                        | API 문서화를 위한 표준 도구로, 팀 간 소통과 유지보수를 용이하게 함.                                                                                                            |
| **Routing**                 | ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)                                                                                                       | SPA(Single Page Application)의 라우팅을 직관적으로 관리하며, 다양한 라우팅 옵션 제공.                                                                                          |
| **Formatting**              | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)              | 코드 품질을 보장하고 일관된 코드 스타일을 유지하며,<br>협업 시 충돌을 줄이고 가독성을 향상.                                                                                    |
| **Package Manager**         | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)                                                                                                                                 | 패키지 설치 속도가 빠르고, 캐싱 기능을 통해 이전에 설치한 패키지를 재사용할 수 있음.                                                                                           |
| **Deployment**              | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                           | 프로젝트의 빠르고 쉬운 배포를 지원.                                                                                                                                            |
| **Bundler**                 | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                 | 초고속 빌드를 제공하여 개발 중 빠른 피드백을 받을 수 있음.                                                                                                                     |
| **State Management**        | ![Zustand](https://img.shields.io/badge/Zustand-3178C6?style=for-the-badge&logo=&logoColor=white)                                                                                                                               | 전역 상태 관리를 간편하게 해주며, React Hooks와 유사한 방식으로 상태를 관리할 수 있어 러닝 커브가 낮고, 작은 크기로 인해 성능에 부담이 적으며, 비동기 로직과도 쉽게 통합 가능. |
| **Real-Time Communication** | ![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=for-the-badge&logo=&logoColor=white)                                                                                                                           | 실시간 통신을 구현하기 위한 기술로, 빠르고 효율적인 데이터 송수신을 가능하게 함.                                                                                               |

<br>

# 🔗 Git Convention

## **🔥 Commit Message Convention**

- Gitmoji를 사용하여 커밋

### 🎨 Gitmoji Commit Convention

| Emoji | Code        | Description           |
| ----- | ----------- | --------------------- |
| 🎉    | `:tada:`     | 프로젝트 시작         |
| ✨    | `:sparkles:`  | 새로운 기능 추가      |
| 🐛    | `:bug:`     | 버그 수정             |
| ♻️    | `:recycle:`  | 코드 리팩토링         |
| 🎨    | `:art:`     | 코드 스타일 / UI 개선 |
| 💄    | `:lipstick:`  | UI / 디자인 변경      |
| 📝    | `:memo:`      | 문서 작성             |
| 🔧    | `:wrench:` | 설정 파일 변경        |
| 🧪    | `:test_tube:`| 테스트                |
| 📦    |`:package:`   | 패키지 관리           |
| 🚀    | `:rocket:`    | 배포                  |
| 🔥    | `:fire:`   | 코드 삭제             |

<br>

## **🌿 Branch Convention**

### **Branch Naming 규칙**

- **형식**: `<prefix>/<기능요약>`
- **기능 요약**: `snake_case`로 작성
- **Prefix 목록**:
  - `feature/`: 새로운 기능 개발
  - `fix/`: 버그 수정
  - `docs/`: 문서 추가, 수정, 삭제
  - `refactor/`: 코드 리팩토링
  - `test/`: 테스트 코드 작성 및 리팩토링
  - `design/`: CSS 등 사용자 UI 디자인 변경
  - `chore/`: 기타 작업 (패키지 매니저 수정, `.gitignore` 변경 등 모든 부가 작업)
  - `Hotfix/`: 긴급하게 치명적인 버그 수정
- **예시**:
  - `feature/login`
  - `fix/sign_in`

---

## **📋 Issue Convention**

### **Issue Title 규칙**

- **형식**: `[태그] 제목`
- **태그 목록**:
  - `Feat`: 새로운 기능 개발
  - `Fix`: 버그 수정
  - `Docs`: 문서 추가, 수정, 삭제
  - `Refactor`: 코드 리팩토링
  - `Test`: 테스트 코드 작성 및 리팩토링
  - `Design`: CSS 등 사용자 UI 디자인 변경
  - `Chore`: 기타 작업 (패키지 매니저 수정, `.gitignore` 변경 등 모든 부가 작업)
  - `Hotfix`: 긴급하게 치명적인 버그 수정
- **예시**:
  - `[Feat] 대시보드 컴포넌트 구현`
  - `[Docs] README 작성`

### **Issue Template**

- **제목**: `[태그] 간단한 요약`
- **내용**:

  ```markdown
  ## Description

  > 이슈 등록 목적을 상세하게 적어주세요.

  ## Tasks

  - [ ] 구현할 기능을 상세하게 적어주세요.
  ```

## **🔄 Pull Request (PR) Convention**

### **PR Title 규칙**

- **형식**: `[태그] 제목`
- **태그 목록**:
  - `Feat`: 새로운 기능 개발
  - `Fix`: 버그 수정
  - `Docs`: 문서 추가, 수정, 삭제
  - `Refactor`: 코드 리팩토링
  - `Test`: 테스트 코드 작성 및 리팩토링
  - `Design`: CSS 등 사용자 UI 디자인 변경
  - `Chore`: 기타 작업 (패키지 매니저 수정, `.gitignore` 변경 등 모든 부가 작업)
  - `Hotfix`: 긴급하게 치명적인 버그 수정
- **예시**:
  - `[Feat] 대시보드 컴포넌트 구현`
  - `[Fix] Router 설정 버그 수정`

### **PR Template**

- **PR 작성 규칙**:

  ```markdown
  ## Related Issue

  - resolved #{issue_number}

  ## Summary

  > 구현 내용을 요약하여 적어주세요.

  ## Changes

  > 구현 내용을 상세하게 적어주세요.

  ## Photo/Video

  > 구현한 부분의 사진 혹은 영상을 업로드해주세요.

  ## Checklist

  - [ ] 컨벤션에 맞는 PR 타이틀
  - [ ] 관련 이슈 연결
  - [ ] PR 관련 정보 연결 (작업자, 라벨, 마일스톤 등)
  - [ ] Github Action 통과
  ```

  <br>

## 📂 프로젝트 구조

```plaintext
|-- 📁 .github
|-- 📁 node_modules
|-- 📁 public
|-- 📁 src
|   |-- 📁 assets
|   |-- 📁 components
|   |-- 📁 const
|   |-- 📁 pages
|   |-- 📁 store
|   |-- 📁 styles
|   |-- 📁 types
|   |-- 📁 utils
|-- .env
|-- .gitignore
|-- .prettierignore
|-- .prettierrc
|-- .yarnrc.yml
|-- eslint.config.js
|-- index.html
|-- package.json
|-- README.md
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- vercel.json
|-- vite.config.ts
|-- yarn.lock
```

<br>

## 🔗 Alias 설정

```text
@components/* → src/components/*
@pages/*      → src/pages/*
@assets/*     → src/assets/*
@const/*      → src/const/*
@store/*      → src/store/*
@styles/*     → src/styles/*
@types/*      → src/types/*
@utils/*      → src/utils/*
```

<br>

## 🧩 설계 원칙

### 컴포넌트 분리 기준

- 두 곳 이상에서 재사용되는 UI는 `components`
- 특정 페이지에만 사용되는 컴포넌트는 `pages` 내부에서 관리
- 비즈니스 로직과 UI를 분리하여 유지보수성 확보

### 스타일링

- Emotion 사용
- Vite 환경과의 궁합, 타입 안정성, 확장성을 고려하여 styled-components대신 Emotion을 사용
- GlobalStyle + Theme 기반 디자인 시스템 구축

### 개발 방식

- 디자인 → 개발을 순차적으로 나누지 않고 작은 단위로 설계 → 구현 → 개선하는 애자일 방식
- 설계부터 유지보수까지 혼자하는 일인 개발의 특성 상 애자일 방식 채택

<br>

## 📸 주요 기능 (예정)

- 가장 빠른 일정 확인 (콘서트, 발매 일정)
- 아티스트 프로필 및 활동 정리
- 앨범 및 음악 정보 제공
- 관련 링크 모음 (SNS, 음원, 굿즈 등)

<br>

## 🧑‍💻 개발자

| <img src="https://avatars.githubusercontent.com/u/84004687?v=4" width="140"  height="140"  /> |
| :-------------------------------------------------------------------------------------------: |
|                                          **조희우**                                           |
|                          [@huiwoo-jo](https://github.com/huiwoo-jo)                           |
